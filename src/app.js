const express = require("express");
const {adminAuth, userAuth}= require('./middlewares/auth');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');



app.post("/signup", async (req, res) => {
    try {
        const user = new User({
            firstName : "dhoni",
            lastName : "Kohali",
            email : "ViratKohali@gmail.com",
            password : "213423",
           
        })

       const responce =  await user.save();
       res.status(200).send({responce : responce})
        
    } catch (error) {

        console.error(error);
        res.status(400).send("Error Saving the User")
    }
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



