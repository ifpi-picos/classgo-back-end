import {hash} from "bcrypt"
import User from "../models/users.js"

const redefinePassword = async (req, res) => {
    const {email, newPassword, confirmNewPassword} = req.body

    if (!email) {
        return res.status(400).send("Campo Email vazio!")
    }
    
    else if (!newPassword) {
        return res.status(400).send("Campo Nova Senha vazio!")
    }
    
    else if (!confirmNewPassword) {
        return res.status(400).send("Campo Confirmar Nova Senha vazio!")
    }

    const user = await User.findOne({where: {email: email}})

    if (!user) {
        return res.status(400).send("Usuário não cadastrado!")
    }

    const dbPassowrd = await hash(password, 8)

    await User.update({password: dbPassowrd}, {where: {id: user.id}})

    return res.status(200).send("Senha redefinida com sucesso!")
}

export default redefinePassword
