import {hash} from "bcrypt"
import User from "../models/users.js"

const redefinePassword = async (req, res) => {
    const {newPassword, confirmNewPassword, userId} = req.body
    
    if (!newPassword) {
        return res.status(400).send("Campo Senha Atual vazio!")
    }
    
    else if (!confirmNewPassword) {
        return res.status(400).send("Campo Nova Senha vazio!")
    }

    else if (newPassword != confirmNewPassword) {
        return res.status(400).send("Campos Nova Senha e Confirmar Nova Senha distintos!")
    }

    const dbPassword = await hash(newPassword, 8)

    await User.update({password: dbPassword}, {where: {id: userId}})

    return res.status(200).send("Senha redefinida com sucesso!")
}

export default redefinePassword
