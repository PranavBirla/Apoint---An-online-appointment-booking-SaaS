function verifyEmailTemplate({
    username,
    verificationUrl
}) {

    return `
        <!DOCTYPE html>

        <html>

        <body>

            <!-- We'll design this later -->
            <h2>Verify your email</h2>

<p>
Click the button below to verify your account.
</p>

<a href="${verificationUrl}">
    Verify Email
</a>

<p>
If the button doesn't work,
copy this link:
</p>

${verificationUrl}

        </body>

        </html>
    `;

}

module.exports = verifyEmailTemplate;