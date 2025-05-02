const express = require("express");
const {adminAuth, userAuth}= require('./middlewares/auth');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
app.use(express.json());


app.post("/signup", async (req, res) => {
   
    // creating the instance of the model
    const user = new User(req.body);
    try {
       
       const responce =  await user.save();
       res.status(200).send({responce : responce})
        
    } catch (error) {

        console.error(error);
        res.status(400).send("Error Saving the User")
    }
})

 
app.get('/user', async (req, res) => {
    const emailId = req.body.email;
    

    try { 
        const user = await User.find({email : emailId})
        
        if (user?.length === 0){
            console.log("user Not found")
            res.status(404).send("user not found");
        } else{
            res.status(200).send({user : user});
        }
      
    } catch (error) {
        console.error(error);
        res.status(400).send("Something Went wrong")
    }
})


// Feed API - GET /feed - get all the users from the database
app.get('/feed', async (req, res) => {
    try {
        
        const data = await User.find()

        res.status(200).send({data : data});
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



