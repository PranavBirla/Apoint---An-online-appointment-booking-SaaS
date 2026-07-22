const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["client", "professional"],
        default: "client"
    },
    avatar: {
        type: String,
        default: ""
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationToken: {
        type: String
    },

    emailVerificationTokenExpires: {
        type: Date
    }
},
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;