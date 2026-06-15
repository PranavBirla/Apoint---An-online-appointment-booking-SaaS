const express = require("express");
const availabilityController = require("../controllers/availability.controller");
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/appointment", authMiddleware, appointmentController.createAppointment);

module.exports = router;