const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Mailer route to send an email
router.post('/send', async (req, res) => {
    try {
        const { email, mess } = req.body;

        if (!email || !mess) {
            return res.status(400).send('Email and message are required.');
        }

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Hello ✔",
            text: mess,
        });

        res.status(200).send(`Mail sent successfully!`);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email. Please try again later.');
    }
});

module.exports = router;
