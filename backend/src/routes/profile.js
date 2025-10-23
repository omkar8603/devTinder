const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {allowedProfileToEditData, validateProfileEditData} = require('../utils/validation')
const validator = require('validator');
const User = require('../models/user');





profileRouter.get('/profile/view', userAuth, async (req, res) => {
   
    try {

        const user = req.user;
       
        res.status(200).send({ user: user });

          
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send("ERROR: " + error.message);
    }
    
})  


profileRouter.put('/profile/edit', userAuth, async (req, res) => {
    try {
        if(!allowedProfileToEditData(req)){
            throw new Error ("Invalid Edit Request")
        }
         
        validateProfileEditData(req);
        
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        
        loggedInUser.ifProfileCompleted = true;

        await loggedInUser.save();
        res.status(200).json({ message : `${loggedInUser.firstName} your profile updated successfully `,
                               data : loggedInUser
                            })




    } catch(error){
       res.status(400).send("ERROR : " + error.message);
    }
})

profileRouter.patch('/profile/changepassword', userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const loggedInUser = req.user;

    if (!oldPassword || !newPassword) {
      throw new Error("Both oldPassword and newPassword are required");
    }

    const isOldPasswordCorrect = await loggedInUser.validatePassword(oldPassword);
    if (!isOldPasswordCorrect) {
      throw new Error("Old password is incorrect");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong enough");
    }

    loggedInUser.password = newPassword;
    await loggedInUser.save();

    res.status(200).send({ message: "Password changed successfully" });

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});



module.exports = profileRouter