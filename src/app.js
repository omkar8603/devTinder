const express = require("express");
const {adminAuth, userAuth}= require('./middlewares/auth');
const app = express();


app.get("/getUserData", (req, res) => {
    
    try {
        console.log("before error");
        throw new Error("iesf");
        res.send("User data sent");
        console.log("after affer")
    } catch (error) {
        res.status(500).send("Some Error Contact support team")
    }
   
         
})
 
 

app.use('/', (err, req, res, next) => {
    if (err){
        res.status(500).send("something went wrong");
    }
})

app.listen(7777, () => {
    console.log("Server is Successfully listning on port 7777...")
})

