import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send("Token não fornecido!")
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
            return res.status(401).send(error.message)
        }

        req.body.userId = decode.userId

        return next()
    })
}

export default verifyToken
