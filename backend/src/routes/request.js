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


        if (!['interested', 'ignored'].includes(status)) {
            throw new Error(`Invalid status : ${status} - must be either 'interested' or 'ignored'`);
        }

        const fromUser = await User.findById(toUserId);

        if (!fromUser) {
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
                    fromUserId: toUserId,
                    toUserId: fromUserId
                }
            ]

        })

        if (existingRequest) {
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


requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const { status, requestId } = req.params;
        const allowedStatuses = ['accepted', 'rejected'];
        if (!allowedStatuses.includes(status)) {
            throw new Error('Invalid status: ' + status + ' - must be either "accepted" or "rejected"');
        }


        const request = await ConnectionRequest.findOne({
            _id: requestId,
            status: 'interested'
        });

        if (!request) {
            throw new Error('Connection request not found !!');
        }

        if (request.toUserId.toString() !== req.user._id.toString()) {
            throw new Error('You are not authorized to review this request');
        }

        request.status = status;
        const updatedRequest = await request.save();

        res.status(200).send({
            message: `${req.user.firstName} ${status} the connection request`,
            updatedRequest
        })

    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
})



// just for testing 

requestRouter.get('/request/find/:id', async (req, res) => {
    try {


        const reqData = await ConnectionRequest.findById(req.params.id);

        res.send(reqData);

    } catch (error) {
         console.log("error : " + error);
    }
})

module.exports = requestRouter;