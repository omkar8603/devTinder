const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



const userSchema = new   mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 4 ,
        maxlength : 40 ,
        trim : true
    },
    lastName : {
        type : String,
        minlength : 4 ,
        maxlength : 40 
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        trim : true,
        minlength : 10 ,
        maxlength : 40,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address: ' + value)
            }
        }
    },
    password : { 
        type : String,
        required : true,
        minlength : 4 ,
        maxlength : 100 ,
        validate(value){
            if (!validator.isStrongPassword(value)){
                throw new Error ("Enter the strong password : " + value);
            }
        }
    }, 
    age : {
        type : Number,
        min : 18,
        minlength : 4 ,
        maxlength : 40 
    },          
    gender: {
       type: String,
         enum: ['male', 'female', 'others'],
     }
,
    photoUrl : {
        type : String,
        default : "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=2048x2048&w=is&k=20&c=Bd6iDyKyMT7thqxegIgyFAkAJ70RFcuzlM3m0tGBovg=",
        validate(value){
            if (!validator.isURL(value)){
                throw new Error ("Invalid Photo URL: " + value);
            }
        }
    },
    about :  {
        type : String,
        default : "this is about the default of user!!",
        minlength : 4 ,
        maxlength : 100 
    },
    skills : {
        type : [String],
        validate: [arr => arr.length <= 10, 'Maximum 10 skills allowed']
    }
} , {timestamps : true})


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // 🔐 hashes password
    }
    next();
});


userSchema.methods.getJWT = async function() {
    const user = this; 

    const token =  await jwt.sign({_id : user._id}, "DEV@Tinder$790", {
        expiresIn : '7d' })

        return token;
} 

userSchema.methods.validatePassword = async function(passwordInputByUser) {
   const user = this;
   const passwordHash = user.password;
   const isPasswordMatch = await bcrypt.compare(passwordInputByUser, passwordHash)
   return isPasswordMatch;
}

const User = mongoose.model("User", userSchema);
User.init(); 
module.exports = User

