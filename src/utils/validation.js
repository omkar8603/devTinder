const validator = require('validator');


const validationSignUpData = (req) => {

    const {firstName, lastName, email, password } = req.body;

    
     if (!/^[A-Za-z\s]+$/.test(firstName) || !/^[A-Za-z\s]+$/.test(lastName)) {
            throw new Error('First name or Last name must contain only letters and spaces');
        }
} 

module.exports = {
    validationSignUpData
} 
 