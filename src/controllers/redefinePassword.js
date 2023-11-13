import {compare, hash} from "bcrypt"
import User from "../models/users.js"

const redefinePassword = async (req, res) => {
    const {email, password, newPassword} = req.body

    if (!email) {
        return res.status(400).send("Campo Email vazio!")
    }
    
    else if (!password) {
        return res.status(400).send("Campo Senha Atual vazio!")
    }
    
    else if (!newPassword) {
        return res.status(400).send("Campo Nova Senha vazio!")
    }

    const user = await User.findOne({where: {email: email}})

    if (!user) {
        return res.status(400).send("Usuário não cadastrado!")
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return res.status(400).send("Senha Atual inválida!")
    }

    const dbPassoword = await hash(newPassword, 8)

    await User.update({password: dbPassoword}, {where: {id: user.id}})

    return res.status(200).send("Senha redefinida com sucesso!")
}

export default redefinePassword
