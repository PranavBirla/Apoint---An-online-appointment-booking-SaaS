const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const professionalProfileRoutes = require("./routes/professionalProfile.routes")
const availabilityRoutes = require("./routes/availability.routes")
const appointmentRoutes = require("./routes/appointment.routes")
const blockedSlotRoutes = require("./routes/blockedSlot.routes");
const testEmail = require("./controllers/testEmail.controller");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
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

app.get("/test-email", testEmail.sendTestEmail)

module.exports = app;