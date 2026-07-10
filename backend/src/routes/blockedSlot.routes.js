const express = require("express");
const availabilityController = require("../controllers/availability.controller");
const blockedSlotController = require("../controllers/blockedSlot.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = express.Router();


router.post(
    "/blocked-slots",
    authMiddleware,
    roleMiddleware("professional"),
    blockedSlotController.createBlockedSlot
);

router.get(
    "/blocked-slots/me",
    authMiddleware,
    roleMiddleware("professional"),
    blockedSlotController.getMyBlockedSlots
);

router.delete(
    "/blocked-slots/:id",
    authMiddleware,
    roleMiddleware("professional"),
    blockedSlotController.deleteBlockedSlot
);

module.exports = router;