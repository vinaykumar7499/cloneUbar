import nodemailer from 'nodemailer';

// Gmail SMTP Transporter Configuration (Port 465 + SSL)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
    },
});

type SendMailOptions = {
    to: string;
    subject: string;
    html: string;
};

// Reusable function to send emails
export const sendMail = async ({ to, subject, html }: SendMailOptions) => {
    try {
        const mailOptions = {
            from: `"Rydex" <${process.env.NODEMAILER_EMAIL}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Error sending email via Nodemailer:", error);
        throw error;
    }
};

export default transporter;