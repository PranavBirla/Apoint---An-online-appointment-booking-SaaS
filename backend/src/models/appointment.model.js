const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "professionalProfile",
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "cancelled",
            "completed",
            "rejected"
        ],
        default: "pending"
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    cancellationReason: {
        type: String,
        trim: true,
        maxlength: 500
    },
    cancelledAt: {
        type: Date
    }
});

appointmentSchema.index(
    {
        professionalId: 1,
        appointmentDate: 1,
        startTime: 1
    },
    {
        unique: true
    }
);

appointmentSchema.index({
    clientId: 1,
    status: 1
});

appointmentSchema.index({
    clientId: 1,
    professionalId: 1,
    status: 1
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = appointmentModel;