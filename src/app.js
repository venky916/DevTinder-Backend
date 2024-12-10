const express = require('express')

const app = express();
const {adminAuth,UserAuth} = require('./middlewares/auth')

app.use("/admin", adminAuth)

app.get('/admin/get-data', (req, res) => {
    res.send('Getting all Data')
})

app.delete('/admin/delete-me', (req, res) => {
    res.send('deleting all data')
})
app.get('/user/login', (req, res) => {
    res.send('login Route')
})

app.get('/user/data',UserAuth, (req, res) => {
    res.send('user Route')
})





app.listen(3000, () => {
    console.log("successfully listening on port 3000 ....!")
})