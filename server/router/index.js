const express = require('express')
const controller = require("../controllers")

const router = express.Router()

router.get('/get-content', controller.content);
router.post('/send-result', controller.sendMail);

module.exports = router