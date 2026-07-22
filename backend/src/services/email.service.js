const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({
    to,
    subject,
    html
}) {

    try {

        const { data, error } = await resend.emails.send({

            from: "Apoint <notifications@mail.apoint.in>",

            to,

            subject,

            html

        });

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {

        console.error("Email sending failed:", error);

        throw error;

    }

}

module.exports = {
    sendEmail
};