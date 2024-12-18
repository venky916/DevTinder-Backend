const express = require('express');
const { userAuth } = require('../middlewares/auth');

const connectionRouter = express.Router();

connectionRouter.post('/send-connection', userAuth, (req, res) => {
    const user = req.user;
    console.log("sending connection request");
    res.send(`${user.firstName} is Sending Connection `)
})


module.exports = connectionRouter;