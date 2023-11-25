import {hash, compare} from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/users.js"

export const signUp = async (req, res) => {
    const {name, email, type, password, confirmPassword} = req.body

    if (!name) {
        return res.status(400).send("Campo nome obrigatório!")
    }

    else if (!email) {
        return res.status(400).send("Campo email obrigatório!")
    }

    else if (!password) {
        return res.status(400).send("Campo senha obrigatório!")
    }

    else if (!confirmPassword) {
        return res.status(400).send("Campo confirmar senha obrigatório!")
    }

    else if (password != confirmPassword) {
        return res.status(400).send("Campos senha e confirmar senha distintos!")
    }

    const dbEmail = await User.findOne({where: {email: email}})

    if (dbEmail) {
        return res.status(400).send("Usuário já cadastrado!")
    }

    const dbPassword = await hash(password, 8)

    await User.create({name, email, type, password: dbPassword})

    return res.status(201).send("Usuário cadastrado com sucesso!")
}

export const signIn = async (req, res) => {
    const {email, password} = req.body
    
    if (!email) {
        return res.status(400).send("Campo email obrigatório!")
    }
    
    else if (!password) {
        return res.status(400).send("Campo senha obrigatório!")
    }
    
    const user = await User.findOne({where: {email: email}})

    if (!user) {
        return res.status(400).send("Usuário não cadastrado!")
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return res.status(400).send("Senha inválida!")
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: 60})

    return res.status(200).send({token: token, userType: user.type})
}
