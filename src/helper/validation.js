const validator = require('validator')

const signUpValidation = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName )  {
        throw new Error('firstname or lastname not present')
    } else if (!validator.isEmail(emailId)) {
        throw new Error('Not a valid Email')
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Not a strong password')
    }
}

const validateEditProfileData = (req) => {
    const allowedEditableFields = ["age", "gender", "photoUrl", 'firstName', "lastName", "about", "skills"];

    const isAllowedEdit = Object.keys(req.body).every(key => allowedEditableFields.includes(key));

    return isAllowedEdit;
}

module.exports = {signUpValidation,validateEditProfileData}