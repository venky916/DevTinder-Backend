const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();
const USER_SAFE_DATA = 'firstName lastName age skills about gender'

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status : 'interested'
        }).populate('fromUserId', ["firstName", "lastName","age","gender","about","skills"])
        
        res.send({
            message: "Data Fetched Successfully",
            data :connectionRequest
        })
        
    } catch (error) {
        res.status(400).send('Error'+ error.message)
    }
})


userRouter.get('/user/connections', userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id,status :"accepted" },
                {toUserId : loggedInUser._id , status :"accepted"}
            ]
        })
            .populate('fromUserId', USER_SAFE_DATA)
            .populate('toUserId',USER_SAFE_DATA)
        
        const data = connectionRequest.map(row => {
            if (row.fromUserId.toString() === loggedInUser._id) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({data});
    } catch (error) {
        res.status(400).send('Error '+ error.message)
    }
})

module.exports = userRouter;