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
    const isConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

    console.log('Incoming Signal:', { name, email, type, message, urgency });

    if (!isConfigured) {
        console.warn('[AUTH_NODE] WARN: EMAIL_USER/PASS missing. Entering SIMULATION_MODE.');
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        return res.status(200).json({
            success: true,
            message: 'TRANSMISSION SIMULATED. Add real credentials to .env to enable live dispatch.'
        });
    }

    // Configure your SMTP transporter here
    // Recommend using a service like Gmail (App Passwords) or SendGrid
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        pool: true, // Use a pool of connections for faster dispatch
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Best practice for Gmail
        replyTo: email,
        to: process.env.RECEIVER_EMAIL || 'avi.bist@nyu.edu',
        subject: `[PORTFOLIO TRANSMISSION] ${type.toUpperCase()} | Urgency: ${urgency.toUpperCase()}`,
        html: `
            <div style="font-family: 'JetBrains Mono', monospace; padding: 40px; background-color: #0A1428; color: #E0E0E0; border: 1px solid #00D9FF;">
                <h2 style="color: #00D9FF; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid rgba(0,217,255,0.2); padding-bottom: 20px;">Incoming Signal Detected</h2>
                <div style="margin-top: 30px; line-height: 1.8;">
                    <p><strong style="color: #FFD700;">SOURCE_IDENTITY:</strong> ${name}</p>
                    <p><strong style="color: #FFD700;">RETURN_NODE:</strong> ${email}</p>
                    <p><strong style="color: #FFD700;">SIGNAL_TYPE:</strong> ${type}</p>
                    <p><strong style="color: #FFD700;">PRIORITY_LEVEL:</strong> ${urgency}</p>
                    <div style="margin-top: 40px; padding: 25px; background: rgba(0, 217, 255, 0.05); border-left: 4px solid #00D9FF;">
                        <p><strong style="color: #00D9FF;">ENCRYPTED_MESSAGE:</strong></p>
                        <p style="white-space: pre-line; color: #FFFFFF;">${message}</p>
                    </div>
                </div>
                <p style="margin-top: 50px; font-size: 10px; color: #555; text-align: center;">PHOTONIC_PORTFOLIO_BACKEND_V4 // TRANSMISSION_TIMESTAMP: ${new Date().toISOString()}</p>
            </div>
        `
    };

    try {
        console.log(`[AUTH_NODE] Attempting to dispatch email to: ${mailOptions.to}`);
        await transporter.sendMail(mailOptions);
        console.log('[AUTH_NODE] Transmission complete. Success code 200.');
        res.status(200).json({ success: true, message: 'Message dispatched successfully!' });
    } catch (error) {
        console.error('[AUTH_NODE] CRITICAL_FAILURE:', error.message);
        res.status(500).json({ success: false, message: 'Transmission failed. Ensure environment nodes (EMAIL_USER/PASS) are configured correctly.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend node listening on port ${PORT}`);
});
