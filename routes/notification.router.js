import express from "express";
import Notification from '../models/notification.js';
import nodemailer from 'nodemailer';
import axios from "axios";

const router = express.Router();

// Configure the mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'contact.fithealth23@gmail.com',
        pass: 'ebrh bilu ygsn zrkw',
    },
});

router.post("/create/request/:id/:owner", async (req, res) => {
    try {
        const { id, owner } = req.params;
        const requestResponse = await axios.get(`http://localhost:3000/request/${id}`);
        const requestData = requestResponse.data;

        const text = `${owner} Created New Request with the title "${requestData.title}" 
        Description : "${requestData.description}".`;
        const type = "Request Creation";
        const notification = new Notification({ owner, text, type });
        await notification.save();
        const mailOptions = {
            from: 'contact.fithealth23@gmail.com',
            to: owner,
            subject: "New Request Created",
            text: text,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ notification, emailInfo: info.response });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post("/update/request/state/:id/:owner", async (req, res) => {
    try {
        const { id, owner } = req.params;
        const requestResponse = await axios.get(`http://localhost:3000/request/${id}`);
        const requestData = requestResponse.data;

        const text = `Your Request "${requestData.title}"  has been Updated "${requestData.stats}" `;
        const type = "Request Update State";
        const notification = new Notification({ owner, text, type });
        await notification.save();
        const mailOptions = {
            from: 'contact.fithealth23@gmail.com',
            to: owner,
            subject: "Request Update State",
            text: text,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ notification, emailInfo: info.response });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: error.message });
    }
});



router.post("/newauth/:owner", async (req, res) => {
    try {
        const { owner } = req.params;
        const text = `New Connection With your Email`;
        const type = "New Authentification";
        const notification = new Notification({ owner, text, type });
        await notification.save();
        const mailOptions = {
            from: 'contact.fithealth23@gmail.com',
            to: owner,
            subject: type,
            text: text,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ notification, emailInfo: info.response });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: error.message });
    }
});


router.post("/newauth/:owner", async (req, res) => {
    try {
        const { owner } = req.params;
        const text = `New Connection With your Email`;
        const type = "New Authentification";
        const notification = new Notification({ owner, text, type });
        await notification.save();
        const mailOptions = {
            from: 'contact.fithealth23@gmail.com',
            to: owner,
            subject: type,
            text: text,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ notification, emailInfo: info.response });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: error.message });
    }
});
router.post("/closesession/:owner", async (req, res) => {
    try {
        const { owner } = req.params;
        const text = `Session Closed With your Email`;
        const type = "Session Closed .";
        const notification = new Notification({ owner, text, type });
        await notification.save();
        const mailOptions = {
            from: 'contact.fithealth23@gmail.com',
            to: owner,
            subject: type,
            text: text,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.status(200).json({ notification, emailInfo: info.response });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: error.message });
    }
});
export default router;
