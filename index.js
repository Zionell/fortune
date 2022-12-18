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
    res.sendFile(path.join(__dirname, '/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})