const User = require('../Models/userModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstname, lastname, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const url = `http://localhost:3000/message/${token}`;
        await transporter.sendMail({
            to: email,
            subject: 'Hello from ProSizeByRushi, Verify Your Email',
            html: `Click <a href="${url}">here</a> to verify your email.`,
        });

        res.status(201).json({ message: 'User registered. Check your email for verification link.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify Email
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ error: 'Invalid token or user does not exist.' });
        }

        user.isVerified = true;
        await user.save();

        let email = user.email
        let name = user.firstname
        let lastname = user.lastname
        let id = user._id
        

        res.status(200).json({ name, lastname, email, token, id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ error: 'Email not verified' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        let name = user.firstname
        let lastname = user.lastname
        let id = user._id

        res.status(200).json({ name, lastname, email, token, id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, verifyEmail, loginUser };
