const { createTransport } = require("nodemailer");

const createPasswordResetUrl = (id, token) => 
    `${process.env.CLIENT_URL}/reset-password/${id}/${token}`;

    const transporter = createTransport({
        service: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });



// creating the mail template to be sent

const passwordResetTemplate = (user, url) => {
    const { username, email } = user;
    return {
        from: `Mail - <${proccess.env.EMAIL_USER}>`,
        TO: email,
        subject: `Reset Password`,
        html: `
        <h2>Password Reset Link</h2>
        <p> Reset your password by clicking on the link below</p>
        <a href=${url}><button>Reset Passwords</button></a>
        <br />
        <br />
        <small><a style="color: #38A169" href=${url}>${url}</a></small>
        <br />
        <small> The link will expire in 15 minutes! </small>
        <small> If you haven't requested a password reset, please ignore</small>
        <br /><br />
        <p> Thanks,</p>
        <p>Authentication API</p>
        `
    };
};

const passwordResetConfirmationTemplate = (user) => {
    const { email } = user;
    return {
        from: `Mail - <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Password reset successful`,
        html: `
        <h2>Password reset successful</h2>
        <p>You've successfully updated your password.</p>
        <small> If you didn't change your password, please reset it from your account.</small>
        <br /><br />
        <p>Thanks,</p>
        <p>Authentication API.</p>
        `
    };
};

module.exports = {
    transporter,
    createPasswordResetUrl,
    passwordResetTemplate,
    passwordResetConfirmationTemplate,
};