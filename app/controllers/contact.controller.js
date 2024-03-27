// Import necessary modules
const db = require("../models");
const Contact = db.contact;
const nodemailer = require("nodemailer");

exports.saveContactInfo = async (req, res) => {
    try {
        const contact = await Contact.create({
            emailuser: req.body.emailuser,
            nomPrenom: req.body.nomPrenom,
            message: req.body.message
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ghazouani.nader@gmail.com',
                pass: 'RQMgw87kbpLvDYrV',
            }
        });

        const mailOptions = {
            from: req.body.emailuser,
            to: process.env.EMAIL_USER,
            subject: "Contact Form Submitted ",
            html: req.body.message
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Contact form submitted successfully', contact });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
};
