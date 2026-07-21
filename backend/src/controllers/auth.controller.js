const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function registerUser(req, res) {
    try {

        const { username, email, password, role, avatar, isVerified } = req.body;

        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "user already exists!" });
        };

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "all fields are required!" })
        };

        if (password.length < 8) {

            return res.status(400).json({
                message:
                    "Password must be at least 8 characters."
            });

        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            role,
            avatar,
            isVerified
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: "User created successfully!",
            user: {
                username,
                email,
                role,
                isVerified,
                _id: user._id
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

async function updateUserProfile(req, res) {
    try {

        const { username, avatar } = req.body;

        const user = await userModel.findById(
            req.user._id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (username !== undefined) {
            user.username = username;
        }

        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "invalid username or email"
            });
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "invalid username or email"
            });
        };

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
        });

        res.status(200).json({
            message: "user logged in successfully!",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                id: user._id
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function logoutUser(req, res) {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({
            message: "user logged out successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

async function getMe(req, res) {
    res.status(200).json({
        user: req.user
    })
}

module.exports = {
    registerUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    getMe
}