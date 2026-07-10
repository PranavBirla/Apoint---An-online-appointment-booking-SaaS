const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const professionalProfileRoutes = require("./routes/professionalProfile.routes")
const availabilityRoutes = require("./routes/availability.routes")
const appointmentRoutes = require("./routes/appointment.routes")
const blockedSlotRoutes = require("./routes/blockedSlot.routes");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", professionalProfileRoutes);
app.use("/api", availabilityRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", blockedSlotRoutes);


app.get("/", (req, res) => {
    res.send("Backend Running!")
})

module.exports = app;