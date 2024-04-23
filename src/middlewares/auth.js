import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/dotenv.js"

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send("Token não fornecido!")
    }

    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).send(err.message)
        }

        req.userId = decode.userId

        return next()
    })
}

export default verifyToken
