// const express = require('express');
// const router = express.Router();
// const bcrypt = require('crypt');
// const jwt = require('jsonwebtoken');
// const nodemainler = require('nodemainer')
// const User = require('../models/User')

// // User reg
// router.post('/signup', async (req, res) => {
//     try {
//         const { email, password } =req.body

//         // Check if email exists already
//         const existingUser = await User.findOne({email});
//         if(existingUser) {
//             return res.status(400).json({error: ' Email already taken'});
//         }
//     }
// })