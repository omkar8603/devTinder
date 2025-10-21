const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest');

const USER_SAFE_DATA = 'firstName lastName photoUrl age  gender about skills'

// Get all the pending connection request for the loggedInUser
userRouter.get('/user/request/received', userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
       
        const receivedRequests = await ConnectionRequest.find({
       
           toUserId : loggedInUserId,
           status : "interested" 
        }).populate('fromUserId', USER_SAFE_DATA)

       if (receivedRequests.length === 0){
       return res.status(200).send({ message: "No connection requests found"})
       }

      return res.status(200).send({ message : "Connection requests found",
          receivedRequests
       })

    } catch (error) {
       return res.status(400).send("ERROR: " + error.message);
    }
})

//Get all the connections of the loggedInUser 
userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId : loggedInUser._id, status : 'accepted'},
                { toUserId : loggedInUser._id, status : 'accepted' }
            ]
        }).populate('fromUserId', USER_SAFE_DATA   )
        .populate('toUserId', USER_SAFE_DATA);


        const data = connections.map((connection) => {
            return connection.fromUserId._id.equals(loggedInUser._id)
                ? connection.toUserId
                : connection.fromUserId;
        });
        
        if (data.length === 0 || !data) {
            return res.status(200).send({ message: "No connections found" });
        }


       return res.status(200).send({
            message : "Conneections found",
            connections : data
        })
        
    } catch (error) {
      return  res.status(400).send("ERROR: " + error.message);
    }
})

 // Get feed of other users
userRouter.get('/user/feed', userAuth, async (req, res) => { 
    try {
       

        const loggedInUser =  req.user;
        
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const MAX_LIMIT = 10;
        const limit = Math.min(Math.max(1, parseInt(req.query.limit) || 20), MAX_LIMIT);
        const skip = (page - 1) * limit;

        const loggedInUserConnections = await ConnectionRequest.find({
            $or : [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id, }
            ]
        }).select('fromUserId toUserId');
        
            
        const loggedInUserConnectionIds = loggedInUserConnections.map(connection => { 
            return connection.fromUserId.equals(loggedInUser._id) ? connection.toUserId : connection.fromUserId;
        })

        
        const users = await User.find({
            _id: { $nin: [...loggedInUserConnectionIds, loggedInUser._id] },
            
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit)

        if (users.length === 0) {
            return res.status(200).send({ message: "No users found" });
        }

        return res.status(200).json({
            message: "Users Found",
            totalUsers: users.length,
            users
        })
    } catch (error) {
        return res.status(400).send("ERROR: " + error.message);
    }
})


// just for testing

userRouter.get('/user/find/:reqId', async (req, res) => {
    try {
        const id = req.params.reqId;

        const data = await User.findById(id)

        res.send(data);

    } catch (error) {
        console.log("error : ", error);
    }
})



module.exports = userRouter; 