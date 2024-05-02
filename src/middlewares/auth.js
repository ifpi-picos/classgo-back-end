import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send("Token não fornecido!")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).send(err.message)
        }

        req.userId = decode.userId

        return next()
    })
}

export default verifyToken
