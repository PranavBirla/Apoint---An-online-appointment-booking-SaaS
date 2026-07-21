const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "appointment_created",
            "appointment_confirmed",
            "appointment_cancelled",
            "appointment_rescheduled",
            "appointment_reminder_24h",
            "appointment_reminder_2h"
        ]
    },

    isRead: {
        type: Boolean,
        default: false
    },

    relatedAppointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment"
    },

    actionUrl: {
        type: String
    }
},
    { timestamps: true }
);

notificationSchema.index({
    userId: 1,
    createdAt: -1
});

module.exports = mongoose.model("notification", notificationSchema);

