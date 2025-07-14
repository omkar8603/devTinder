const validator = require('validator');


const validationSignUpData = (req) => {

const {firstName, lastName, email, password } = req.body;

    
     
function isValidName(name) {
  const trimmed = name.trim();
  return trimmed.length >= 2 && /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(trimmed);
}

if (!isValidName(firstName) || !isValidName(lastName)) {
  throw new Error("Name must contain only letters and spaces, and cannot be empty or start/end with space.");
}

} 

module.exports = {
    validationSignUpData
} 
 