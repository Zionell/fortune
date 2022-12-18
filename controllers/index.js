const transporter = require("../mailer")

class Controllers {
    async content(req, res) {
        const content = [
            { color: "#fd0100", label: "Фломастеры" },
            { color: "#333ed4", label: "Стикеры" },
            { color: "#f76915", label: "Чехол для То2" },
            { color: "#a0d636", label: "Рулон бумаги" },
            { color: "#eede04", label: "Шоколад" },
            { color: "#f0b", label: "Скидка 5% на след. покупку" },
        ];
        res.send(content)
    }

    async sendMail(req, res) {
        const {email, phone, prize} = req.body
        const message = `
                         <h1>Пользователь ${email} выиграл ${prize}.</h1>
                            <div>Способы связи:</div>
                            <ul>
                                <li>
                                    Почта: ${email}
                                </li>
                                <li>
                                    Телефон: ${phone}
                                </li>
                            </ul>
                                
                        `
        const result = await transporter.sendMail({
            from: 'test',
            to: process.env.MAIL,
            subject: 'Победитель фортуны',
            html: message,
        })
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send({email, phone, prize})
    }
}

module.exports = new Controllers()