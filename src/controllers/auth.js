import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    const {name, email, type, password, confirmPassword} = req.body

    if (!name) {
        return res.status(400).send("Campo Nome vazio!")
    }

    else if (!email) {
        return res.status(400).send("Campo Email vazio!")
    }

    else if (!password) {
        return res.status(400).send("Campo Senha vazio!")
    }

    else if (!confirmPassword) {
        return res.status(400).send("Campo Confirmar Senha vazio!")
    }

    else if (password != confirmPassword) {
        return res.status(400).send("Campos Senha e Confirmar Senha distintos!")
    }

    const dbEmail = await User.findOne({where: {email: email}})

    if (dbEmail) {
        return res.status(400).send("Usuário já cadastrado!")
    }

    const dbPassowrd = await bcrypt.hash(password, 8)

    await User.create({name, email, type, password: dbPassowrd})

    return res.status(201).send("Usuário cadastrado com sucesso!")
}

export const signIn = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({where: {email: email}})

    if (!email) {
        return res.status(400).send("Campo Email vazio!")
    }

    if (!password) {
        return res.status(400).send("Campo Senha vazio!")
    }

    else if (!user) {
        return res.status(400).send("Usuário não cadastrado!")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).send("Senha inválida!")
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: 60})

    return res.status(200).send({userId: user.id, userType: user.type, token})
}
