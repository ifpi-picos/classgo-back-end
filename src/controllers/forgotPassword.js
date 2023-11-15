import { createTransport } from "nodemailer"
import jwt from "jsonwebtoken"
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

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: 120})

    const message = "Pedido de solicitação enviado para seu email!"

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
        html: `
                <h1>
                    Olá, ${user.name}! Tudo bem?
                <h1/>

                <p>
                    Acesse o link para alterar sua senha: <a href="https://reverse-time-front-end.vercel.app/redefinepassword">Alterar Senha<a/>
                <p/>
            `
    }

    await transport.sendMail(mailOptions)

    return res.status(200).send({token: token, message: message})
}

export default requestNewPassword
