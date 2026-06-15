const express = require("express");
const professionalProfileController = require("../controllers/professionalProfile.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.post("/professional/create", authMiddleware, roleMiddleware("professional"), professionalProfileController.createProfessionalProfile);
router.get("/professional/get", professionalProfileController.getProfessionalProfiles);
router.get("/professional/get/:id", professionalProfileController.getProfessional);

module.exports = router;