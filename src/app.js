const express = require("express");
const {userAuth}= require('./middlewares/auth');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const { validationSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(cookieParser());
app.use(express.json());


app.post("/signup", async (req, res) => {
   
   
    try {

         const {firstName, lastName, email, password} = req.body;
       
        // Validation of data
        validationSignUpData(req);


        // Encrypt the password
       
       

    // creating the instance of the model
       const user = new User({
        firstName,
        lastName,
        email,
        password 
       });

       const responce =  await user.save();
       res.status(200).send({responce : responce})
        
    } catch (error) {

        console.error(error);
        res.status(400).send({"Error Saving the User" : error.message})
    }
})

app.post('/login', async(req, res) => {
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

            return res.status(200).send("Login Successful !!!");
            
        } 
        else {
            throw new Error("Invalid Credentials");
        }

    } catch (error) {
        console.error(error);
       res.status(400).send("Error: " + error.message);
    }
})

app.get('/profile', userAuth, async (req, res) => {
   
    try {

        const user = req.user;
        res.status(200).send({ user: user });

          
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send("ERROR: " + error.message);
    }
    
}) 

 
app.post('/sendConnectionRequest', userAuth, async (req, res) => {
     const user = req.user; 

    // sending connection request to user
    console.log("Sending a connection Request");

    res.status(200).send(user.firstName + " Connection Request Sent Successfully");
})

          








connectDB()
    .then(() => {
    console.log("Database Connection established...")
    app.listen(7777, () => {
        console.log("Server is Successfully listning on port 7777...")
    })
    })
    .catch((err) => {
        console.log("Database is not connected!!", err);
    })



   

