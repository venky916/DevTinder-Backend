const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required:true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email');
            }
        }
    },
    password: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Not Strong Password");
                
            }
        }
        
    },
    age: {
        type: Number,
        min :18
        
    },
    gender: {
        type: String,
        // immutable: true,
        validate(value) {
            if (!['others', 'male', 'female'].includes(value)) {
                throw new Error('Gender data is not Valid')
            }
        }
    },
    photoUrl :{
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            console.log(value);
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value);
            }
        },
    },
    DOB: {
        type: Date,
        max: new Date('2011-12-31')
    },
    about: {
        type: String,
        default:"Hello ,How u doing,"  
    },
    skills: {
        type:[String]
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)