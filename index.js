require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require("path")
const router = require("./router")

const port = process.env.PORT || 3000

app.use(cors({
    origin: '*',
}))
app.use(express.json());

app.use('/api', router);

app.get('*', (req, res) => {
    // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    // res.setHeader(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.sendFile(path.join(__dirname, '/client/dist', '/index.html'), function (err) {
    //     if (err) {
    //         res.status(500).send(err)
    //     }
    // })
    res.send('Server started')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;