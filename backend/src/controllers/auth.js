import Teacher from "../models/teachers.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const signUp = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body

    if (!name) {
        return res.status(400).send("empty name field")
    }

    else if (!email) {
        return res.status(400).send("empty email field")
    }

    else if (!password) {
        return res.status(400).send("empty password field")
    }

    else if (!confirmPassword) {
        return res.status(400).send("empty confirm password field")
    }

    else if (password != confirmPassword) {
        return res.status(400).send("confirm password invalid")
    }

    const dbEmail = await Teacher.findOne({where: {email: email}})

    if (dbEmail) {
        return res.status(400).send("user exist")
    }

    const dbPassowrd = await bcrypt.hash(password, 8)

    await Teacher.create({name, email, password: dbPassowrd})

    return res.status(201).send("user registered successfully")
}

const signIn = async (req, res) => {
    const {email, password} = req.body

    const user = await Teacher.findOne({
        attributes: ["id", "name", "email", "password"], where: {email: email}
    })

    if (!email) {
        return res.status(400).send("empty email field")
    }

    if (!password) {
        return res.status(400).send("empty password field")
    }

    else if (!user) {
        return res.status(400).send("user not exist")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).send("password invalid")
    }

    const id = req.params.id

    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: 60})

    return res.status(200).send(token)
}

export default {
    signUp,
    signIn
}
