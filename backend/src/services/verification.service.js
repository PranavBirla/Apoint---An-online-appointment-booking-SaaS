const crypto = require("crypto");
const { sendEmail } = require("./email.service");
const verifyEmailTemplate = require("../templates/verifyEmail.template");

async function sendVerificationEmail(user) {

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    user.emailVerificationToken = hashedToken;

    user.emailVerificationTokenExpires = Date.now() + 1000 * 60 * 60;

    await user.save();

    const verificationUrl =
        `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    //Send Email
    const html = verifyEmailTemplate({
        username: user.username,
        verificationUrl
    });

    sendEmail({
        to: user.email,
        subject: "Verify your Apoint account",
        html
    }).catch(error => {
        console.error(
            "Verification email failed:",
            error
        );
    });

}

module.exports = {
    sendVerificationEmail
}