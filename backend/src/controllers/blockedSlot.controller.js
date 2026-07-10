const blockedSlotModel = require("../models/blockedSlot.model.js");
const appointmentModel = require("../models/appointment.model.js");
const professionalProfileModel =
    require("../models/professionalProfile.model");

async function createBlockedSlot(req, res) {
    try {

        const {
            date,
            startTime,
            endTime,
            reason
        } = req.body;

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

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

        if (!profile) {
            return res.status(404).json({
                message:
                    "Professional profile not found"
            });
        }

        const professionalId =
            profile._id;

        if (
            !date ||
            !startTime ||
            !endTime
        ) {
            return res.status(400).json({
                message:
                    "Date, start time and end time are required."
            });
        }

        function convertToMinutes(time) {
            const [hours, minutes] =
                time.split(":");

            return (
                Number(hours) * 60 +
                Number(minutes)
            );
        }

        const start =
            convertToMinutes(startTime);

        const end =
            convertToMinutes(endTime);

        if (start >= end) {
            return res.status(400).json({
                message:
                    "End time must be after start time."
            });
        }

        const selectedDate =
            parseLocalDate(date);

        selectedDate.setHours(
            0, 0, 0, 0
        );


        const today =
            new Date();

        today.setHours(
            0, 0, 0, 0
        );

        if (selectedDate < today) {
            return res.status(400).json({
                message:
                    "Past dates cannot be blocked."
            });
        }

        const existingBlockedSlots =
            await blockedSlotModel.find({
                professionalId,
                date: selectedDate
            });

        const hasBlockedOverlap =
            existingBlockedSlots.some(
                slot => {

                    const slotStart =
                        convertToMinutes(
                            slot.startTime
                        );

                    const slotEnd =
                        convertToMinutes(
                            slot.endTime
                        );

                    return (
                        start < slotEnd &&
                        end > slotStart
                    );
                }
            );

        if (hasBlockedOverlap) {
            return res.status(400).json({
                message:
                    "This time range overlaps an existing blocked slot."
            });
        }

        const startOfDay =
            new Date(selectedDate);

        startOfDay.setHours(
            0, 0, 0, 0
        );

        const endOfDay =
            new Date(selectedDate);

        endOfDay.setHours(
            23, 59, 59, 999
        );


        const appointments =
            await appointmentModel.find({
                professionalId,
                appointmentDate: {
                    $gte: startOfDay,
                    $lte: endOfDay
                },
                status: {
                    $in: [
                        "pending",
                        "confirmed"
                    ]
                }
            });


        const hasAppointmentOverlap =
            appointments.some(
                appointment => {

                    const appointmentStart =
                        convertToMinutes(
                            appointment.startTime
                        );

                    const appointmentEnd =
                        convertToMinutes(
                            appointment.endTime
                        );

                    return (
                        start <
                        appointmentEnd &&
                        end >
                        appointmentStart
                    );
                }
            );

        if (hasAppointmentOverlap) {
            return res.status(400).json({
                message:
                    "This time range already contains an appointment."
            });
        }

        const blockedSlot =
            await blockedSlotModel.create({
                professionalId,
                date: selectedDate,
                startTime,
                endTime,
                reason
            });

        return res.status(201).json({
            message:
                "Time blocked successfully.",
            blockedSlot
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Something went wrong"
        });

    }
}


async function getMyBlockedSlots(
    req,
    res
) {
    try {

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        if (!profile) {
            return res.status(404).json({
                message:
                    "Professional profile not found"
            });
        }

        const blockedSlots =
            await blockedSlotModel.find({
                professionalId:
                    profile._id
            })
                .sort({
                    date: 1,
                    startTime: 1
                });

        return res.status(200).json({
            blockedSlots
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Something went wrong"
        });

    }
}

async function deleteBlockedSlot(
    req,
    res
) {
    try {

        const { id } =
            req.params;

        const blockedSlot =
            await blockedSlotModel.findById(
                id
            );

        if (!blockedSlot) {
            return res.status(404).json({
                message:
                    "Blocked slot not found"
            });
        }

        const profile =
            await professionalProfileModel.findOne({
                userId: req.user._id
            });

        if (!profile) {
            return res.status(404).json({
                message:
                    "Professional profile not found"
            });
        }

        if (
            blockedSlot.professionalId.toString()
            !==
            profile._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "Unauthorized"
            });
        }
        

        await blockedSlot.deleteOne();

        return res.status(200).json({
            message:
                "Blocked slot deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Something went wrong"
        });

    }
}


module.exports = {
    createBlockedSlot,
    getMyBlockedSlots,
    deleteBlockedSlot
}