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


module.exports = {
    createAppointment
}