const jwt = require('jsonwebtoken')
const User = require('../models/user');

const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAuthorized = token === 'xyz'
    if (!isAuthorized) {
        res.status(401).send('unauthorized user')
    }
    else {
        next()
    }
}

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token);
        if (!token) {
            return res.status(401).send('Invalid Credentials')
        }
        const {_id} = await jwt.verify(token, 'Dev@Tinder#1234');

        const user = await User.findById(_id);
        if (!user) {
           throw new Error('User Not Found') 
        }
        req.user = user;
        next()
        
    } catch (error) {
        res.status(400).send('Error'+error.message)
    }
}

module.exports = {
    adminAuth,
    userAuth
}