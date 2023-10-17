import users from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const signUp = async (req, res) => {
    const {name, email, password} = req.body

    const dbPassowrd = await bcrypt.hash(password, 8)

    const user = await users.create({name, email, password: dbPassowrd})

    return res.send("Usuário cadastrado com sucesso!")
}

const signIn = async (req, res) => {
    const id = req.params.id

    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: 60})

    return res.send(token)
}

export default {
    signUp,
    signIn
}
