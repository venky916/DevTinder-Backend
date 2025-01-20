const express = require('express');
const connectDB = require('./config/database');

const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const connectionRouter = require('./routes/connectionRouter');
const userRouter = require('./routes/userRouter');

app.use(cors({
    origin: "http://localhost:5173",
    credentials :true
    }
));
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', connectionRouter);
app.use('/', userRouter);



connectDB()
    .then(() => {
        console.log('Connected to Database successfully....')
        app.listen(3000, () => {
            console.log("successfully listening on port 3000 ....!")
        })
    })
    .catch(() => {
        console.error("Error in connecting to database")
    })