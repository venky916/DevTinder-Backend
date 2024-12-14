const mongoose = require('mongoose');

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
        trim:true
    },
    password: {
        type: String,
        unique: true,
        
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
        default: "https://geographyandyou.com/images/user-profile.png"
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