const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt')
const { signUpValidation } = require('./helper/validation')

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const { userAuth } = require('./middlewares/auth');

app.use(express.json())
app.use(cookieParser())

app.post('/signup', async (req, res) => {

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

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        const checkPassword = await user.validatePassword(password);
        if (!checkPassword) {
            throw new Error('Invalid Credentials')
        }
        const token = await user.getJWT();
        res.cookie("token", token, {
            expires : new Date(Date.now() + 7 * 3600000)
        });
        res.send('Login Successfully')
    } catch (error) {
        res.status(401).send('Error :' + error?.message)
    }
})

app.get('/profile', userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (error) {
        res.status(400).send('Something went wrong')
    }

})

app.post('/send-connection', userAuth, (req, res) => {
    const user = req.user;
    console.log("sending connection request");
    res.send(`${user.firstName} is Sending Connection `)
})



connectDB()
    .then(() => {
        console.log('Connected to Database successfully....')
        app.listen(3000, () => {
            console.log("successfully listening on port 3000 ....!")
        })
    })
    .catch(() => {
        console.error("Error in connecting to database")
    })