const express = require('express')

const app = express();


app.use('/', (err, req, res, next) => {
    console.log("Error rout top")
    if (err) {
        res.status(500).send('Error occur check the code')
    }
})


app.get('/user', (req, res) => {
    // try {
    //     throw new Error('err message');
    // } catch (error) {
        
    // }

    throw new Error('err message');

    
    res.send('Error came ?')
})

app.use('/', (err, req, res, next) => {
    console.log("Error rout")
    if (err) {
        res.status(500).send('Error occur check the code')
    }
})







app.listen(3000, () => {
    console.log("successfully listening on port 3000 ....!")
})