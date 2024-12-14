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

module.exports = {signUpValidation}