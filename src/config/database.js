const mongoose = require('mongoose');


const connectDB = async () => {

        await mongoose.connect(
            "mongodb+srv://omkarmane8603:Final123@cluster0.mjoalxq.mongodb.net/devTinder"
        )
      
}



module.exports = connectDB;







