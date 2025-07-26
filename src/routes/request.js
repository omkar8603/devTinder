const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');


requestRouter.post('/sendConnectionRequest', userAuth, async (req, res) => {
     const user = req.user; 

    // sending connection request to user
    console.log("Sending a connection Request");

    res.status(200).send(user.firstName + " Connection Request Sent Successfully");
})


module.exports = requestRouter;