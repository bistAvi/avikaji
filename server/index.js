import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// POST endpoint for contact form
app.post('/api/contact', async (req, res) => {
    const { name, email, type, message, urgency } = req.body;

    console.log('Received transmission:', { name, email, type, message, urgency });

    // Configure your SMTP transporter here
    // Recommend using a service like Gmail (App Passwords) or SendGrid
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL || 'avi.bist@nyu.edu',
        subject: `[PROTFOLIO INQUIRY] ${type.toUpperCase()} from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <h2 style="color: #333;">New Contact Form Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Urgency:</strong> ${urgency}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-line;">${message}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message dispatched successfully!' });
    } catch (error) {
        console.error('Transmission Failure:', error);
        res.status(500).json({ success: false, message: 'Transmission failed. Ensure environment nodes are configured correctly.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend node listening on port ${PORT}`);
});
