const express = require('express')

const app = express();

app.use('/test', (req, res) => {
    console.log("Hello test page")
    res.send('hello test page')
})

app.use("/",(req, res) => {
    res.send('Hello World Welcome to node js')
})

app.listen(3000, () => {
    console.log("successfully listening on port 3000 ....!")
})