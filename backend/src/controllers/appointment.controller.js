const appointmentModel = require("../models/appointment.model");
const professionalProfileModel = require("../models/professionalProfile.model");
const availabilityModel = require("../models/availability.model");

async function createAppointment(req, res) {

    try {

        const { professionalId, appointmentDate, startTime, endTime } = req.body;

        const clientId = req.user._id



        function parseLocalDate(dateString) {

            const [year, month, day] =
                dateString
                    .split("-")
                    .map(Number);

            return new Date(
                year,
                month - 1,
                day
            );
        }

        const normalizedDate =
            parseLocalDate(
                appointmentDate
            );

        const activeAppointmentCount =
            await appointmentModel.countDocuments({
                clientId,
                status: {
                    $in: [
                        "pending",
                        "confirmed"
                    ]
                }
            });

        if (activeAppointmentCount >= 3) {
            return res.status(400).json({
                message:
                    "You already have 3 active appointments. Complete or cancel an existing appointment before booking another."
            });
        }

        const existingActiveAppointment =
            await appointmentModel.findOne({
                clientId,
                professionalId,
                status: {
                    $in: [
                        "pending",
                        "confirmed"
                    ]
                }
            });

        if (existingActiveAppointment) {
            return res.status(409).json({
                message:
                    "You already have an active appointment with this professional."
            });
        }


        const professional = await professionalProfileModel.findById(professionalId);

        if (!professional) {
            return res.status(404).json({
                message: "Professional not found"
            });
        }

        const dayOfWeek =
            normalizedDate
                .toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long"
                    }
                );

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

        

        const appointment = await appointmentModel.create({
            clientId,
            professionalId,
            appointmentDate: normalizedDate,
            startTime,
            endTime
        })

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointment
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
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
        const { cancellationReason } = req.body;

        const appointment =
            await appointmentModel.findById(id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        if (
            appointment.status ===
            "cancelled"
        ) {
            return res.status(400).json({
                message:
                    "Appointment is already cancelled."
            });
        }

        if (
            appointment.status ===
            "completed"
        ) {
            return res.status(400).json({
                message:
                    "Completed appointments cannot be cancelled."
            });
        }

        function getAppointmentDateTime(
            appointmentDate,
            startTime
        ) {

            const [hours, minutes] =
                startTime.split(":");

            const appointmentDateTime =
                new Date(appointmentDate);

            appointmentDateTime.setHours(
                Number(hours),
                Number(minutes),
                0,
                0
            );

            return appointmentDateTime;
        }

        const appointmentDateTime =
            getAppointmentDateTime(
                appointment.appointmentDate,
                appointment.startTime
            );

        const now = new Date();

        const differenceInHours =
            (
                appointmentDateTime - now
            )
            /
            (
                1000 * 60 * 60
            );

        if (appointmentDateTime <= now) {
            return res.status(400).json({
                message: "Past appointments cannot be cancelled."
            });
        }

        if (differenceInHours < 12) {
            return res.status(400).json({
                message:
                    "Appointments cannot be cancelled within 12 hours of the scheduled start time."
            });
        }

        if (!cancellationReason) {
            return res.status(400).json({
                message:
                    "Cancellation reason is required."
            });
        }

        if (
            cancellationReason.trim().length < 10
        ) {
            return res.status(400).json({
                message:
                    "Cancellation reason must be at least 10 characters."
            });
        }

        if (
            cancellationReason.length > 500
        ) {
            return res.status(400).json({
                message:
                    "Cancellation reason cannot exceed 500 characters."
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

        appointment.status =
            "cancelled";

        appointment.cancellationReason =
            cancellationReason;

        appointment.cancelledAt =
            new Date();

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