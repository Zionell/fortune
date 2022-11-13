const transporter = require("../mailer")

class Controllers {
    async content(req, res) {
        const content = [
            { color: "#f82", label: "Фломастеры" },
            { color: "#0bf", label: "Стикеры" },
            { color: "#fb0", label: "Чехол для То2" },
            { color: "#0fb", label: "Рулон бумаги" },
            { color: "#b0f", label: "Шоколад" },
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
        res.send({email, phone, prize})
    }
}

module.exports = new Controllers()