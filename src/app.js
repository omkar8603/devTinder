const express = require("express");
const {adminAuth, userAuth}= require('./middlewares/auth');
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
        const passwordHash = await  bcrypt.hash(password, 10);
       

    // creating the instance of the model
       const user = new User({
        firstName,
        lastName,
        email,
        password : passwordHash
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

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            // Create JWT Token 

            const token = await jwt.sign({ _id : user._id}, "DEV@Tinder$790");

            // add the token to cookies and send the response back to user

            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.status(200).send("Login Successful !!!");
            
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (error) {
        console.error(error);
       res.status(400).send("Error: " + error.message);
    }
})

app.get('/profile', async (req, res) => {
   
    try {

        const cookies = req.cookies;
        const { token } = cookies;
    // Validate the token
    
      if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
      }

        const decoded = await jwt.verify(token, "DEV@Tinder$790");

        const user = await User.find({_id : decoded._id});

        if (!user){
            throw new Error("User not exist");
        }

        res.status(200).send({ user: user });

          
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send("Unauthorized: Invalid token");
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


// find the user by its id
app.get('/user/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        
     const user = await User.findById(userId);
     if (!user){
        res.status(404).send("user does not find")
     } else {
        res.status(200).send({user : user});
     }
        
    } catch (error) {
        console.error(error);
        res.status(400).send("User does not find")
    }
})


// delete any user

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        console.log("delete user successfully"); 
        res.status(200).send({deletedUser : deletedUser})
    }  catch (error) {
        console.error(error);
        res.status(400).send("User does not find")
    }
})


app.delete("/delete-all-users", async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.status(200).send({ message: "All users deleted", deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete users" });
    }
});



// update the user

app.patch('/user', async (req, res) => {
    const {userId, ...updates}= req.body;
    
    
    try {

        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"]
    
        const isUpdateAllowed = Object.keys(updates).every((k) => 
                  ALLOWED_UPDATES.includes(k)
      );
        
        if(!isUpdateAllowed){
            throw new Error("Updates not allowed");
        }

        const updateData = await User.findByIdAndUpdate(userId,
            updates, {
                runValidators : true
            } 
        )
        console.log("updated data ", updateData);
        res.status(200).send({updateData : updateData})
    } catch (error) {
        console.error(error);
        res.status(400).send({"Update Fails " : error.message})
    } 
})


// update use with email

app.patch("/user/:emailId", async (req, res) => {
  const { emailId } = req.params;
  const updates = req.body;

  const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(updates).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send({ error: "Updates not allowed" });
  }

  try {
    const updatedData = await User.findOneAndUpdate(
      { email: emailId },
      updates,
      {
        new: true, // return updated document
        runValidators: true,
      }
    );

    if (!updatedData) {
      return res.status(404).send({ error: "User not found" });
    }

    console.log("Update by email successful");
    res.status(200).send({ updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});





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



   

