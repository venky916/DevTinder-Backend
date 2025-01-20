const express = require('express');
const { signUpValidation } = require('../helper/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
    try {
        signUpValidation(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(passwordHash)
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send('Data added to database successfully')
    } catch (error) {
        // console.log(error)
        res.status(401).send('Error in saving in database' + error.message)
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId }).select('-createdAt -updatedAt');
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        const checkPassword = await user.validatePassword(password);
        if (!checkPassword) {
            throw new Error('Invalid Credentials')
        }
        const token = await user.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 3600000)
        });
        res.json({
            message: 'Login Successfully',
            data: user
        })
    } catch (error) {
        res.status(401).send('Error :' + error?.message)
    }
})

authRouter.post('/logout', (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
     res.send('Logout successfully')
})


module.exports = authRouter