const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Super Admin Model
const User = require('../models/User');

// Function to send password reset email
const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        // Create a transporter using SMTP settings or other transport options
        const transporter = nodemailer.createTransport({
            // Specify your email provider's SMTP settings or other transport options
            service: 'Gmail',
            auth: {
                user: 'ogundebusayo16@gmail.com', // Replace with your email address
                pass: "busayo'sgmail2023" // Replace with your email password
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'ogundebusayo16@gmail.com', // Replace with your email address
            to: email,
            subject: 'Password Reset',
            html: `<p>Please click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

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

        // Generate a random OTP (combination of numbers and letters)
        const otp = crypto.randomBytes(4).toString('hex').toUpperCase();

        // Update the user's OTP in the database
        user.otp = otp;
        await user.save();

        // Send the OTP to the user's email
        const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${otp}`;
        await sendPasswordResetEmail(user.email, resetLink);

        res.status(200).json({ message: 'Password reset OTP sent' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});


// Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { email, otp, password } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update the user's password and clear the OTP
        user.password = hashedPassword;
        user.otp = undefined;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
