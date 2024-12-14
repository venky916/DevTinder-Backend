const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.send('Data added to database successfully')
    } catch (error) {
        console.log(error)
        res.status(401).send('Error in saving in database'+ error.message)
    }
})

app.get('/user', async (req, res) => {
    const emailId = req.body.emailId;
    try {
        const users = await User.find({ emailId: emailId });
        if (users.length !== 0) {
            res.send(users)
        } else {
            res.status(404).send('Data not found')
        }
    } catch (error) {
        res.status(500).send('Something went wrong')
    }

})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

app.delete('/delete', async (req, res) => {
    const userId = req.body.userId;
    try {
        const response = await User.findByIdAndDelete(userId);
        // console.log(response);
        res.send('Deleted user Successfully');
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

app.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const response = await User.findByIdAndUpdate(id, user, {
            returnDocument: 'after',
            runValidators:true
        });
        // console.log(response);
        res.send('Updated successfully')
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

app.patch('/update', async (req, res) => {
    const { emailId, ...user } = req.body;
    console.log(emailId, user);
    query = {"emailId":emailId}
    try {
        const response = await User.findOneAndUpdate(query, user,{returnDocument:"after"});
        console.log(response);
        res.send('Updated successfully')
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
})

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