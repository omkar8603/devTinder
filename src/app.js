const express = require("express");

const app = express();

app.use("/",(req, res) => {
    res.send("welcome to dash board");
})

app.use("/hello",(req, res) => {
    res.send("Hello Hello Hello ...");
})

app.use("/test",(req, res) => {
     res.send("Hello Form Server");
})




app.listen(7777, () => {
    console.log("Server is Successfully listning on port 3000...")
})