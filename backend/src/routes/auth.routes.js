const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/user/register", authController.registerUser);
router.patch("/user/me", authMiddleware, authController.updateUserProfile);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
router.get("/user/me", authMiddleware, authController.getMe);

router.post("/verify-email", authController.verifyEmail);

module.exports = router;