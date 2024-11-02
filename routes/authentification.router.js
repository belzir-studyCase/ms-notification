
import express from "express";
import User from '../models/notification.js';


const router = express.Router();

router.post("/login", async (req, res) => { 
    try {
        const { googleId, imageUrl, email, name, givenName, familyName } = req.body;  // Get data from req.body

        try {
            let user = await User.findOne({ googleId });

            if (!user) {
                const role = "Client";
                user = new User({ googleId, imageUrl, email, name, givenName, familyName , role });
                await user.save();
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

router.get("/all/users", async (req, res) => {
    try {
        let users = await User.find({ role: "Client" });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;