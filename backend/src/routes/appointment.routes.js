const express = require("express");
const availabilityController = require("../controllers/availability.controller");
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.post("/appointment", authMiddleware, appointmentController.createAppointment);
router.get("/appointments/my", authMiddleware, appointmentController.getMyAppointments);
router.get("/appointments/professional", authMiddleware, appointmentController.getProfessionalAppointments);

router.patch("/appointments/:id/status", authMiddleware, roleMiddleware("professional"), appointmentController.updateAppointmentStatus);
router.patch("/appointments/:id/cancel", authMiddleware, appointmentController.cancelAppointment);

module.exports = router;