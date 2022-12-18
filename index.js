require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const router = require("./router")

const port = process.env.PORT || 3000

app.use(cors({
    origin: '*',
}))
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;