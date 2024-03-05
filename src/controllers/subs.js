require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

// Add code to save the email to database

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing to our newsletter!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error occurred while sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Subscription successful! Check your email for confirmation.');
        }
    });
    // Sending a confirmation response
    const confirmationMessage = `Thank you for subscribing! Confirmation email sent to: ${email}`;
    // Send the confirmation message back to the client
    res.send(confirmationMessage);
});