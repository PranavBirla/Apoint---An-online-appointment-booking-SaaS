const appointmentModel = require("../models/appointment.model");
const professionalProfileModel = require("../models/professionalProfile.model");
const availabilityModel = require("../models/availability.model");

async function createAppointment(req, res) {
    const { professionalId, appointmentDate, startTime, endTime } = req.body;

    const clientId = req.user._id

    const professional = await professionalProfileModel.findById(professionalId);
    console.log(professionalId);


    if (!professional) {
        return res.status(404).json({
            message: "Professional not found"
        });
    }

    const dayOfWeek = new Date(appointmentDate).toLocaleDateString("en-US", { weekday: "long" });

    const availability = await availabilityModel.findOne({ professionalId, dayOfWeek });

    if (!availability) {
        return res.status(400).json({
            message:
                "Professional is not available on this day"
        });
    }

    function convertToMinutes(time) {
        const [hours, minutes] = time.split(":");
        const totalMinutes = Number(hours) * 60 + Number(minutes);
        return (totalMinutes)
    }

    const availabilityStart =
        convertToMinutes(
            availability.startTime
        );

    const availabilityEnd =
        convertToMinutes(
            availability.endTime
        );

    const appointmentStart =
        convertToMinutes(
            startTime
        );

    const appointmentEnd =
        convertToMinutes(
            endTime
        );

    if (appointmentStart < availabilityStart || appointmentEnd > availabilityEnd) {
        return res.status(400).json({
            message: "Slot is outside availability"
        });
    }

    const difference = appointmentStart - availabilityStart;

    if (difference % availability.slotDuration !== 0) {
        return res.status(400).json({
            message: "Invalid slot boundary!"
        })
    }

    const appointmentDuration = appointmentEnd - appointmentStart;

    if (appointmentDuration !== availability.slotDuration) {
        return res.status(400).json({
            message: "Invalid appointment duration"
        });
    }

    const existingAppointment = await appointmentModel.findOne({
        professionalId,
        appointmentDate,
        startTime
    });

    if (existingAppointment) {
        return res.status(409).json({
            message: "Appointment already exists!"
        })
    }

    const appointment = await appointmentModel.create({
        clientId,
        professionalId,
        appointmentDate,
        startTime,
        endTime
    })

    res.status(201).json({
        message: "Appointment booked successfully!",
        appointment
    })
}


async function getMyAppointments(req, res) {
    try {
        const { status } = req.query;

        const validStatuses = [
            "pending",
            "confirmed",
            "completed",
            "cancelled"
        ];
        
        if (
            status &&
            !validStatuses.includes(status)
        ) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const query = {
            clientId: req.user._id
        };

        if (status) {
            query.status = status;
        }

        const appointments = await appointmentModel.find(query)
            .populate({
                path: "professionalId",
                populate: {
                    path: "userId",
                    select: "username email avatar"
                }
            });

        const formattedAppointments = appointments.map(
            appointment => {
                return {
                    appointmentId: appointment._id,

                    professionalName:
                        appointment.professionalId.userId.username,

                    profession:
                        appointment.professionalId.profession,

                    appointmentDate:
                        appointment.appointmentDate,

                    startTime:
                        appointment.startTime,

                    endTime:
                        appointment.endTime,

                    status:
                        appointment.status
                };
            }
        )

        res.status(200).json({
            appointments: formattedAppointments
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }

}


async function getProfessionalAppointments(req, res) {
    try {
        const { status } = req.query;

        const validStatuses = [
            "pending",
            "confirmed",
            "completed",
            "cancelled"
        ];

        if (
            status &&
            !validStatuses.includes(status)
        ) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const profile = await professionalProfileModel.findOne({ userId: req.user._id });

        if (!profile) {
            return res.status(404).json({
                message: "Professional profile not found"
            });
        }

        const query = {
            professionalId: profile._id
        };

        if (status) {
            query.status = status;
        }

        const appointments = await appointmentModel.find(query)
            .populate("clientId", "username email avatar");



        const formattedAppointments = appointments.map(
            appointment => {
                return {
                    appointmentId: appointment._id,

                    clientName:
                        appointment.clientId.username,

                    clientEmail:
                        appointment.clientId.email,

                    clientAvatar:
                        appointment.clientId.avatar,

                    appointmentDate:
                        appointment.appointmentDate,

                    startTime:
                        appointment.startTime,

                    endTime:
                        appointment.endTime,

                    status:
                        appointment.status
                };
            }
        )

        res.status(200).json({
            appointments: formattedAppointments
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }
}


async function updateAppointmentStatus(req, res) {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "pending",
            "confirmed",
            "completed"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        const appointment =
            await appointmentModel.findById(id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        if (
            appointment.professionalId.toString()
            !==
            profile._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        if (
            appointment.status === "cancelled" ||
            appointment.status === "completed"
        ) {
            return res.status(400).json({
                message: "Appointment can no longer be modified"
            });
        }

        const allowedTransitions = {
            pending: ["confirmed", "cancelled"],
            confirmed: ["completed", "cancelled"],
            completed: [],
            cancelled: []
        };

        if (
            !allowedTransitions[
                appointment.status
            ].includes(status)
        ) {
            return res.status(400).json({
                message:
                `Cannot change status from ${appointment.status} to ${status}`
            });
        }

        appointment.status = status;

        await appointment.save();

        res.status(200).json({
            message: "Status updated successfully",
            appointment
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

async function cancelAppointment(req, res) {
    try {

        const { id } = req.params;

        const appointment =
            await appointmentModel.findById(id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        if (
            appointment.clientId.toString()
            !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        appointment.status = "cancelled";

        await appointment.save();

        res.status(200).json({
            message:
                "Appointment cancelled successfully",
            appointment
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }
}


module.exports = {
    createAppointment,
    getMyAppointments,
    getProfessionalAppointments,
    updateAppointmentStatus,
    cancelAppointment
}