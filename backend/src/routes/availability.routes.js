const express = require("express");
const availabilityController = require("../controllers/availability.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.get( "/availability/me", authMiddleware, roleMiddleware("professional"), availabilityController.getMyAvailability );
router.get("/availability/get/:professionalId", availabilityController.getAvailableDays);
router.get("/availability/get/:professionalId/slots", availabilityController.getAvailableSlots);
router.post("/availability", authMiddleware, roleMiddleware("professional"), availabilityController.setAvailability)
router.patch("/availability/:id", authMiddleware, roleMiddleware("professional"), availabilityController.updateAvailability)

module.exports = router;