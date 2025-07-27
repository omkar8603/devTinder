const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');


requestRouter.post('/request/send/:status/:userId', userAuth, async (req, res) => {
    
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        if (!['interested', 'ignored'].includes(status)){
            throw new Error (`Invalid status : ${status} - must be either 'interested' or 'ignored'`);
        }

        const fromUser = await User.findById(toUserId);

        if (!fromUser){
            throw new Error("From user not found");
        }

        // Check if a connection request already exists
        const existingRequest = await ConnectionRequest.findOne({
           $or: [
                 {
                    fromUserId,
                    toUserId
                 },
                 {
                    fromUserId : toUserId,
                    toUserId : fromUserId
                 }
           ]

        })

        if (existingRequest){
            throw new Error("Connection request already exists between these users");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status       
         })


         const sendRequestData = await connectionRequest.save();
         res.status(200).send({ message: `${req.user.firstName} is ${status} in ${fromUser.firstName}`, data: sendRequestData });
         
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }


})


module.exports = requestRouter;