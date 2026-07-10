const availabilityModel = require("../models/availability.model");
const professionalProfileModel = require("../models/professionalProfile.model");
const appointmentModel = require("../models/appointment.model");
const blockedSlotModel = require("../models/blockedSlot.model");

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
            dayOfWeek,
            isActive: true
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
            slotDuration,
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

async function updateAvailability(req, res) {
    try {

        const { id } = req.params;

        const {
            startTime,
            endTime,
            slotDuration,
            isActive
        } = req.body;

        const availability =
            await availabilityModel.findById(id);

        if (!availability) {
            return res.status(404).json({
                message: "Availability not found"
            });
        }

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        if (!profile) {
            return res.status(404).json({
                message: "Professional profile not found"
            });
        }

        if (
            availability.professionalId.toString()
            !==
            profile._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        if (startTime !== undefined) {
            availability.startTime = startTime;
        }

        if (endTime !== undefined) {
            availability.endTime = endTime;
        }

        if (slotDuration !== undefined) {
            availability.slotDuration = slotDuration;
        }

        if (isActive !== undefined) {
            availability.isActive = isActive;
        }

        await availability.save();

        return res.status(200).json({
            message:
                "Availability updated successfully",
            availability
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
}

async function getAvailableDays(req, res) {
    try {

        const { professionalId } = req.params;

        const availabilities = await availabilityModel.find({ professionalId, isActive: true });

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

        const selectedDate =
            parseLocalDate(date);

        const dayOfWeek =
            selectedDate
                .toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long"
                    }
                );


        const professional =
            await professionalProfileModel.findById(
                professionalId
            );

        if (!professional) {
            return res.status(404).json({
                message: "Professional not found."
            });
        }


        const availability = await availabilityModel.findOne({
            professionalId,
            dayOfWeek,
            isActive: true
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



        const startOfDay =
            parseLocalDate(date);

        const endOfDay =
            new Date(startOfDay);

        endOfDay.setDate(
            endOfDay.getDate() + 1
        );

        const appointments = await appointmentModel.find({
            professionalId,
            appointmentDate: {
                $gte: startOfDay,
                $lt: endOfDay
            },
            status: {
                $in: [
                    "pending",
                    "confirmed"
                ]
            }
        })

        const blockedSlots =
            await blockedSlotModel.find({
                professionalId,
                date: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            });

        const slotsWithStatus = slots.map(slot => {

            const bookedAppointment =
                appointments.some(
                    appointment =>
                        appointment.startTime === slot.start &&
                        appointment.endTime === slot.end
                );

            const blockedSlot =
                blockedSlots.some(
                    blocked =>
                        slot.start < blocked.endTime &&
                        slot.end > blocked.startTime
                );

            return {
                ...slot,
                booked:
                    bookedAppointment ||
                    blockedSlot
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

async function getMyAvailability(req, res) {
    try {

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        if (!profile) {
            return res.status(404).json({
                message: "Professional profile not found"
            });
        }

        const availability =
            await availabilityModel.find({
                professionalId: profile._id,
            });

        return res.status(200).json({
            hasAvailability:
                availability.length > 0,

            availability
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
}

module.exports = {
    setAvailability,
    updateAvailability,
    getAvailableDays,
    getAvailableSlots,
    getMyAvailability
}