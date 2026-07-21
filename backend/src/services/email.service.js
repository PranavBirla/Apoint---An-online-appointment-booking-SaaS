const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    family: 4
});

transporter.verify((error, success) => {

    if (error) {

        console.error("SMTP Verify Error:", error);

    } else {

        console.log("SMTP Ready");

    }

});

async function sendEmail({
    to,
    subject,
    html
}) {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    });
}

module.exports = {
    sendEmail
};