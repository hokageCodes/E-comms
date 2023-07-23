const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { config } = require('dotenv');
config();


// Super Admin Model
const User = require('../models/User');

// Super Admin Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: `The Email ${email} is already registered by you or another user` });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new super admin
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: `Thank you, ${email}, your account was created successfully!` });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Super Admin Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: `User ${email} not found` });
        }

        // Check if the password matches
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
