const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');

const connectionRouter = express.Router();

connectionRouter.post('/send/request/:status/:id', userAuth, async (req, res) => {
    console.log(req.body);
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.id;
        const status = req.params.status;
        const allowedStatus = ['interested', "ignored"]
        if (!allowedStatus.includes(status)) {
            throw new Error('Error in status info')
        }
        const checkToUser = await User.findById(toUserId);
        if (!checkToUser) {
            return res.status(400).send({
                "message":"User Does not exists"
            })
        }
        const existingConnection = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                {fromUserId : toUserId , toUserId :fromUserId}
            ]
        })
        if (existingConnection) {
            return res.status(400).send({
                "message":"Connection request already exists"
            })
        }
        const connectionModel = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionModel.save();
        return res.json({
            "message": `${req.user.firstName}  ${status} ${checkToUser.firstName}`,
            data
        })
    } catch (error) {
        return res.status(400).send('Error :' + error.message);
    }
})


module.exports = connectionRouter;