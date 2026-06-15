const availabilityModel = require("../models/availability.model");
const professionalProfileModel = require("../models/professionalProfile.model");
const appointmentModel = require("../models/appointment.model");

async function setAvailability(req, res) {
    try {

        const { dayOfWeek, startTime, endTime, slotDuration } = req.body

        const profile = await professionalProfileModel.findOne({ userId: req.user._id });

        if (!profile) {
            return res.status(404).json({
                message: "professional profile not found!"
            });
        }

        const existingAvailability = await availabilityModel.findOne({
            professionalId: profile._id,
            dayOfWeek
        });

        if (existingAvailability) {
            return res.status(400).json({
                message: "availability already exists for this day!"
            });
        }

        const availability = await availabilityModel.create({
            professionalId: profile._id,
            dayOfWeek,
            startTime,
            endTime,
            slotDuration
        });

        return res.status(201).json({
            message: "availability created successfully!",
            availability
        });
    } catch (error) {
        console.log("Error in creating availability", error);
        res.status(500).json({
            message: "something went wrong!"
        });
    }
}

async function getAvailableDays(req, res) {
    try {

        const { professionalId } = req.params;

        const availabilities = await availabilityModel.find({ professionalId });

        const availableDays = availabilities.map(availability => availability.dayOfWeek);

        res.status(200).json({
            availableDays
        })
    } catch (error) {
        console.log("error in finding available days", error);
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

async function getAvailableSlots(req, res) {
    try {
        const { professionalId } = req.params
        const { date } = req.query

        const dayOfWeek =
            new Date(date)
                .toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long"
                    }
                );

        const availability = await availabilityModel.findOne({
            professionalId,
            dayOfWeek
        });

        if (!availability) {
            return res.status(404).json({
                message: "No slots found!"
            })
        }

        function convertToMinutes(time) {
            const [hours, minutes] = time.split(":");
            const totalMinutes = Number(hours) * 60 + Number(minutes);
            return (totalMinutes)
        }

        function convertToTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;

            return `${hours
                .toString()
                .padStart(2, "0")}:${mins
                    .toString()
                    .padStart(2, "0")
                }`;
        }

        const startMinutes = convertToMinutes(availability.startTime);
        const endMinutes = convertToMinutes(availability.endTime);

        const slots = [];

        let currentTime = startMinutes;

        while (currentTime + availability.slotDuration <= endMinutes) {
            slots.push({
                start: convertToTime(currentTime),

                end: convertToTime(
                    currentTime +
                    availability.slotDuration
                )
            });
            currentTime += availability.slotDuration;
        }





        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);



        const appointments = await appointmentModel.find({
            professionalId,
            appointmentDate: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        })

        console.log("DATE RECEIVED:", date);
        console.log("APPOINTMENTS:", appointments);

        const slotsWithStatus = slots.map(slot => {

            const booked = appointments.some(
                appointment =>
                    appointment.startTime === slot.start &&
                    appointment.endTime === slot.end
            );

            return {
                ...slot,
                booked
            };

        });

        res.status(200).json({
            date,
            dayOfWeek,
            slots: slotsWithStatus
        })
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
}

module.exports = {
    setAvailability,
    getAvailableDays,
    getAvailableSlots
}