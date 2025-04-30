const express = require("express");

const app = express();



app.use(
    "/user",
    (req, res, next) => {
        console.log("Handling the route user!!");
        next()
        // res.send("Responce!!");
       
    },
    (req, res, next) => {
        console.log("Handling the route user 2");
        // res.send("2nd Responce");
        next();
    },
    (req, res, next) => {
        console.log("Handling the route user 2");
        // res.send("2nd Responce");
        next();
    },
    (req, res, next) => {
        console.log("Handling the route user 2");
        // res.send("2nd Responce");
        next()
    }
)

app.get("/user", (req,res) => {
    console.log("next responce")
    res.send("next Responce");
})

app.listen(7777, () => {
    console.log("Server is Successfully listning on port 7777...")
})