const mongoose = require("mongoose");

const professionalProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    profession: {
        type: String,
        required: true,
        maxlength: 50
    },
    specialization: {
        type: String,
        maxlength: 50
    },
    bio: {
        type: String,
        required: true,
        maxlength: 1000
    },
    experienceYears: {
        type: Number,
        default: 0,
        min: 0,
        max: 70
    },
    consultationFee:{
        type: Number,
        required: true,
        min: 0
    },
    profileImage:{ 
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const professionalProfileModel = mongoose.model("professionalProfile", professionalProfileSchema);

module.exports = professionalProfileModel;