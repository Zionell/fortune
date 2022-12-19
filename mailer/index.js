const nodemailer = require('nodemailer')
console.log(process.env.MAIL_HOST, process.env.MAIL_PORT, process.env.MAIL, process.env.PASSWORD)

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
})

module.exports = transporter