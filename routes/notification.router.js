import express from "express";
import Notification from '../models/notification.js';
import nodemailer from 'nodemailer';
import axios from "axios";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'contact.fithealth23@gmail.com',
        pass: 'ebrh bilu ygsn zrkw', // Consider using environment variables for sensitive information
    },
});

/**
 * @swagger
 * /notifications/create/request/{id}/{owner}:
 *   post:
 *     summary: Create a new request notification
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the request
 *       - in: path
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the owner receiving the notification
 *     responses:
 *       200:
 *         description: Notification created and email sent
 *       500:
 *         description: Server error
 */
router.post("/create/request/:id/:owner", async (req, res) => {
    const { id, owner } = req.params;
    try {
        const requestResponse = await axios.get(`http://localhost:3000/request/${id}`);
        const requestData = requestResponse.data;

        const text = `${requestData.email} Created New Request with the title "${requestData.title}" 
        Description: "${requestData.description}".`;
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

/**
 * @swagger
 * /notifications/update/request/state/{id}:
 *   post:
 *     summary: Update request state and notify the user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the request to update
 *     responses:
 *       200:
 *         description: Notification created and email sent
 *       500:
 *         description: Server error
 */
router.post("/update/request/state/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const requestResponse = await axios.get(`http://localhost:3000/request/${id}`);
        const requestData = requestResponse.data;

        const text = `Your Request "${requestData.title}" has been Updated to "${requestData.stats}".`;
        const type = "Request Update State";

        const notification = new Notification({ owner: requestData.email, text, type });
        await notification.save();

        const mailOptions = {
            from: 'contact.fithealth23@gmail.com',
            to: requestData.email,
            subject: "Request Update State",
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ notification, emailInfo: info.response });
    } catch (error) {
        console.error('Error updating request state:', error.message);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /notifications/newauth/{owner}:
 *   post:
 *     summary: Notify user of new authentication
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the owner receiving the notification
 *     responses:
 *       200:
 *         description: Notification created and email sent
 *       500:
 *         description: Server error
 */
router.post("/newauth/:owner", async (req, res) => {
    const { owner } = req.params;
    try {
        const text = `New Connection With your Email`;
        const type = "New Authentication";

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

/**
 * @swagger
 * /notifications/closesession/{owner}:
 *   post:
 *     summary: Notify user of session closure
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the owner receiving the notification
 *     responses:
 *       200:
 *         description: Notification created and email sent
 *       500:
 *         description: Server error
 */
router.post("/closesession/:owner", async (req, res) => {
    const { owner } = req.params;
    try {
        const text = `Session Closed With your Email`;
        const type = "Session Closed";

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

/**
 * @swagger
 * /notifications/all:
 *   get:
 *     summary: Get all notifications
 *     responses:
 *       200:
 *         description: List of all notifications
 *       500:
 *         description: Server error
 */
router.get("/all", async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;
