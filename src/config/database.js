const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://venkateshsmsv1999:smsv1999@namastenodebackend.phsd7.mongodb.net/namasteDB")
}

module.exports= connectDB

