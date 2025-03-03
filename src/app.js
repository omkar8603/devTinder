const express = require("express");

const app = express();



app.get("/user/:userId" , (req, res) => {
    
    console.log(req.params);
    console.log(req.query); 
    res.send({firstname : "Omkar",
              lastname : "Mane"
    })
})


app.listen(7777, () => {
    console.log("Server is Successfully listning on port 3000...")
})