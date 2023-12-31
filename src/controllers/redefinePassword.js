import { hash } from "bcrypt"
import User from "../models/users.js"

const redefinePassword = async (req, res) => {
    const {id} = req.params
    const {newPassword, confirmNewPassword} = req.body

    try {
        if (!newPassword) {
            return res.status(400).send("Campo senha atual obrigatório!")
        }
        
        else if (!confirmNewPassword) {
            return res.status(400).send("Campo nova senha obrigatório!")
        }
    
        else if (newPassword != confirmNewPassword) {
            return res.status(400).send("Campos nova senha e confirmar nova senha distintos!")
        }
    
        const dbPassword = await hash(newPassword, 8)
    
        await User.update({password: dbPassword}, {where: {id: id}})
    
        return res.status(200).send("Senha redefinida com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }    
}

export default redefinePassword
