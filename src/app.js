const express = require("express");
const {adminAuth, userAuth}= require('./middlewares/auth');
const app = express();


app.use('/admin', adminAuth);  
// app.use('/user', userAuth);

app.get("/admin/getAllData", (req, res) => {
    
    res.send("All  Data sent");

})

app.get("/admin/deleteUser", (req, res) => {
    res.send("Delete a user");
})

app.get("/user/user1", userAuth, (req, res) => {
    console.log("i am user 1")
    res.send("I am User1")
})

app.listen(7777, () => {
    console.log("Server is Successfully listning on port 7777...")
})