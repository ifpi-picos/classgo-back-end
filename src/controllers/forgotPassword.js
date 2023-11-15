import { createTransport } from "nodemailer"
import { hash } from "bcrypt"
import User from "../models/users.js"

const requestNewPassword = async (req, res) => {
    const {email} = req.body

    if (!email) {
        return res.status(400).send("Campo Email vazio!")
    }

    const user = await User.findOne({where: {email: email}})

    if (!user) {
        return res.status(400).send("Usuário não cadastrado!")
    }

    const code = await hash("code", 8)

    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {user: "landeilsonveloso2022@gmail.com", pass: "imxmecmisjczdtkp"}
    })

    const mailOptions = {
        from: "Landeilson Veloso <landeilsonveloso2022@egmail.com>",
        to: `${user.email}`,
        subject: "Solicitação de Alteração de Senha",
        html: `<p>Insira o código para alterar sua senha: ${code}<p/>`,
        text: `Insira o código para alterar sua senha: ${code}`
    }

    await transport.sendMail(mailOptions)

    return res.status(200).send({code: code, message: "Pedido de solicitação enviado para seu email!"})
}

export default requestNewPassword
