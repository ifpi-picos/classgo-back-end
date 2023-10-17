import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const validateSignUp = async (req, res, next) => {
    const {name, email, password} = req.body

    if (!name) {
        return res.send("Name is Null!")
    }

    else if (!email) {
        return res.send("Email is Null!")
    }

    else if (!password) {
        return res.send("Password is Null!")
    }

    const dbEmail = await User.findOne({where: {email: email}})

    if (dbEmail) {
        return res.send("User Exist!")
    }

    return next()
}

const verifyToken = async (req, res, next) => {
    const headAuth = req.headers.authorization

    if (!headAuth) {
        return res.send("No Token provided!")
    }

    const token = await headAuth.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
            return res.send(error)
        }

        req.userId = decode.id
        return next()
    })
}

const validateSignIn = async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({
        attributes: ["id", "name", "email", "password"], where: {email: email}
    })

    if (!user) {
        return res.send("Email or Password Invalid!")
    }

    if (!email) {
        return res.send("Email is Null!")
    }

    else if (!password) {
        return res.send("Password is Null!")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.send("Password Invalid!")
    }

    return next()
}

export default {
    validateSignUp,
    verifyToken,
    validateSignIn
}
