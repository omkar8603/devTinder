const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');


profileRouter.get('/profile', userAuth, async (req, res) => {
   
    try {

        const user = req.user;
        res.status(200).send({ user: user });

          
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send("ERROR: " + error.message);
    }
    
})  

module.exports = profileRouter