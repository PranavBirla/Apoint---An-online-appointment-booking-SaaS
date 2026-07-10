const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    professionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "professionalProfile",
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    slotDuration:{
        type: Number,
        required: true,
        default: 30,
        min: 5
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const availabilityModel = mongoose.model("availability", availabilitySchema);

module.exports = availabilityModel;