const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const userRouter = express.Router();
const USER_SAFE_DATA = 'firstName lastName age skills about gender photoUrl'

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

userRouter.get('/feed', userAuth, async (req, res) => {
    const loggedInUser = req.user;
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = Math.min(parseInt(req.query.limit) || 10,50);
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                {toUserId : loggedInUser._id}
            ]
        }).select('fromUserId toUserId')

        const hiddenUsers = new Set();

        connectionRequests.forEach(item => {
            hiddenUsers.add(item.fromUserId);
            hiddenUsers.add(item.toUserId);
        })

        const USERS = await User.find({
            $and: [
                {
                    _id: { $ne: loggedInUser._id}
                },
                {
                    _id : {$nin : Array.from(hiddenUsers)}
                }
            ]
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit)
        
        // other way using mongodb operators
        // Step 1: Get all user IDs connected to the logged-in user
        const connectedUserIds = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        });

        // Step 2: Fetch non-connected users from the User collection
        const users = await User.find({
            _id: {
                $nin: [...connectedUserIds, loggedInUser._id] 
            }
        })
            .select(USER_SAFE_DATA) 
            .skip(skip)
            .limit(limit);

        res.send({
            data : users
        });
        
    } catch (error) {
        res.status(400).send({message :"Error" + error.message})
    }
})

module.exports = userRouter;