const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const mailjet = require('node-mailjet').connect(apiKey, apiSecret);

// Super Admin Model
const User = require('../models/User');

// Function to send password reset email
const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'sender@example.com', // Replace with your sender email address
                        Name: 'Sender Name' // Replace with your sender name
                    },
                    To: [
                        {
                            Email: email // Email address of the recipient
                        }
                    ],
                    Subject: 'Password Reset',
                    HTMLPart: `<p>Please click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
                }
            ]
        });

        await request;
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

// Super Admin Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

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
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: `Thank you, ${name}, your account was created successfully!` });
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

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token
        const resetToken = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });

        // Generate the reset link
        const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

        // Send the password reset email
        await sendPasswordResetEmail(user.email, resetLink);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify the password reset token
        const decodedToken = jwt.verify(token, 'secret');
        const userId = decodedToken.userId;

        // Update the user's password
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        const newUser = await user.save();

        res.status(200).json({ message: 'Password updated successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
