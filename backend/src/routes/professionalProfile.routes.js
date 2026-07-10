const express = require("express");
const professionalProfileController = require("../controllers/professionalProfile.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();

router.post("/professional/create", authMiddleware, roleMiddleware("professional"), professionalProfileController.createProfessionalProfile);
router.patch("/professional/me", authMiddleware, roleMiddleware("professional"), professionalProfileController.updateProfessionalProfile);
router.get("/professional/get", professionalProfileController.getProfessionalProfiles);
router.get("/professional/get/:id", professionalProfileController.getProfessional);
router.get( "/professional/me", authMiddleware, roleMiddleware("professional"), professionalProfileController.getMyProfessionalProfile );

module.exports = router;