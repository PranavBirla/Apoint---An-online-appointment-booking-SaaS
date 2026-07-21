const { sendEmail } = require("../services/email.service");
const appointmentBookedTemplate = require("../templates/appointmentBooked.template");

const sendTestEmail = async (req, res) => {

    try {

        const html = appointmentBookedTemplate({

            professionalName: "Dr. Sharma",

            clientName: "Pranav",

            date: "25 July 2026",

            startTime: "10:30 AM",

            endTime: "11:00 AM",

            appointmentUrl: "https://google.com"

        });

        await sendEmail({

            to: "pranavbirla06@gmail.com",

            subject: "🚀 Apoint Email Template Test",

            html

        });

        res.status(200).json({
            success: true,
            message: "Template email sent successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed."
        });

    }

};

module.exports = {
    sendTestEmail
}