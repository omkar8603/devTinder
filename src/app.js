const express = require("express");

const app = express();



app.get("/user" , (req, res) => {
    res.send({firstname : "Omkar",
              lastname : "Mane"
    })
})

app.post("/user" , (req, res) => {
    res.send("Data send successfully to database");
})



app.delete("/user" , (req, res) => {
    res.send("Delete sucessful");
})


 
app.use("/test",(req, res) => {
     res.send("Hello Form Server");
})

app.listen(7777, () => {
    console.log("Server is Successfully listning on port 3000...")
})