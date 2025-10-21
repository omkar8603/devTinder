const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth = async (req, res, next) => {
   
    try {

        if (req.method === 'OPTIONS') {
           return res.sendStatus(200);
          }

        // taking the token from the cookies
        const { token } = req.cookies;

        // Validate the token

        if (!token) {
          return  res.status(401).send("Please Login!")  
              }

        // Verify the token
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
        if (!decodedObj) {
            throw new Error("Unauthorized: Invalid token");
        }
       
        const user = await User.findById(decodedObj._id);
        if (!user) {
            throw new Error ("user not found");
        }
        

        // Attach user to the request object
        req.user = user;
    
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).send("ERROR: " + error.message);
    }
    

}


module.exports = {
    userAuth
}