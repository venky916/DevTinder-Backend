const express = require('express')

const app = express();



app.get('/user', (req, res) => {
    console.log(req.query) //key value both are strings
    res.send({"firstName":"Venkatesh","LastName":"Maliga"})
})

app.get('/user/:userId/:name', (req, res) => {
    console.log(req.params) //key value both are strings all the : must be present i url
    res.send({ "firstName": "Venkatesh", "LastName": "Maliga" })
})



app.listen(3000, () => {
    console.log("successfully listening on port 3000 ....!")
})