const express = require('express');
const authRouter = express.Router();
const {validationSignUpData }= require('../utils/validation');
const validator = require('validator');
const User = require('../models/user');



authRouter.post("/signup", async (req, res) => {
   
   
    try {

         const userData = req.body;
       
        // Validation of data
        validationSignUpData(req);


    // creating the instance of the model
       const user = new User(userData);

       const responce =  await user.save();
       res.status(200).send({responce : responce})
        
    } catch (error) {

        console.error(error);
        res.status(400).send({"Error" : error})
    }
})

authRouter.post('/login', async(req, res) => {
    try {
        
       const { emailId, password } = req.body;

       if(!validator.isEmail(emailId)){
        console.log('email not valid')
         throw new Error('enter valid email');
       }

        const user = await User.findOne({ email: emailId });

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isMatch = await user.validatePassword(password);

        if (isMatch) {

            // Create JWT Token 
            const token = await user.getJWT();

            // add the token to cookies and send the response back to user
            res.cookie('token', token, {
                 expires: new Date(Date.now() + 8 * 3600000),
                 httpOnly: true,
                secure: true
            });

            return res.status(200).json({user : user});
            
        } 
        else {
            throw new Error("Invalid Credentials");
        }

    } catch (error) {
        console.error(error);
       res.status(400).json({Error : error.message} );
    }
})



authRouter.post('/logout', async (req, res) => {
   try {
          // Clear the token cookie
          res.cookie('token', null, {
            expires: new Date(Date.now())
          })
          res.status(200).send("Logout Successful");
   } catch (error) {    
        console.error("Logout error:", error);
        res.status(500).send("Error during logout: " + error.message);
   }
})

module.exports = authRouter; 