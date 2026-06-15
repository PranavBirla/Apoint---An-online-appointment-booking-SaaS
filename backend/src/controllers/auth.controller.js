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

async function loginUser(req, res) {
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
        secure: true,
        sameSite: "none"
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
}

async function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.status(200).json({
        message: "user logged out successfully!"
    })
}

async function getMe(req, res) {
    res.status(200).json({
        user: req.user
    })
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}