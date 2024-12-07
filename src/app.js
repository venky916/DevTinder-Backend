const express = require('express')

const app = express();

app.use('/', (req, res) => {
    res.send("HAHAHAHAHAHAHAHAHAHA")
})

app.get('/user', (req, res) => {
    res.send({"firstName":"Venkatesh","LastName":"Maliga"})
})

app.post('/user', (req, res) => {
    console.log("Data added")
    res.send('Data Saved in data bases')
})

app.delete('/user', (req, res) => {
    console.log("delete me");
    res.send('Data Deleted Successfully')
})


app.use("/", (req, res) => {
    res.send('Hello World Welcome to node js')
})


app.listen(3000, () => {
    console.log("successfully listening on port 3000 ....!")
})