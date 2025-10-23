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



const allowedProfileToEditData = (req) => {
    const allowedEditFields = [
      "firstName", 
      "lastName",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills"
    ]
  

   const isEditAllowed = Object.keys(req.body).every((field) => 
      allowedEditFields.includes(field)
  );

   return isEditAllowed;

}

const validateProfileEditData = (req) => {
  const updates = Object.keys(req.body);

  for (let field of updates) {
    const value = req.body[field];

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (typeof value !== 'string' || !validator.isAlpha(value, 'en-US', { ignore: ' ' })) {
          throw new Error(`${field} must contain only letters`);
        }
        break;

      case 'photoUrl':
        if (typeof value !== 'string' || !validator.isURL(value)) {
          throw new Error('Invalid photo URL');
        }
        break;

      case 'gender':
        if (typeof value !== 'string' || !['male', 'female', 'other'].includes(value.toLowerCase())) {
          throw new Error('Invalid gender value');
        }
        break;

      case 'age':
        if (!validator.isInt(String(value), { min: 1, max: 120 })) {
          throw new Error('Age must be a number between 1 and 120');
        }
        break;

      case 'about':
        if (typeof value !== 'string' || value.length > 500) {
          throw new Error('About section too long');
        }
        break;

      case 'skills':
        if (!Array.isArray(value) || !value.every(skill => typeof skill === 'string')) {
          throw new Error('Skills must be an array of strings');
        }
        break;
    }
  }

  
};


     

module.exports = {
    validationSignUpData,
    allowedProfileToEditData,
   validateProfileEditData
} 
 