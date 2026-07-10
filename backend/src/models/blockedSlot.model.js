const mongoose = require("mongoose");

const blockedSlotSchema =
    new mongoose.Schema({

        professionalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "professionalProfile",
            required: true,
            index: true,
        },

        date: {
            type: Date,
            required: true,
            index: true,
        },

        startTime: {
            type: String,
            required: true,
        },

        endTime: {
            type: String,
            required: true,
        },

        reason: {
            type: String,
            maxlength: 100,
        },

    }, {
        timestamps: true,
    });

blockedSlotSchema.index({
    professionalId: 1,
    date: 1
});

blockedSlotSchema.index({
    professionalId: 1,
    date: 1,
    startTime: 1
});

const blockedSlotModel = mongoose.model("blockedSlot", blockedSlotSchema);

module.exports = blockedSlotModel;