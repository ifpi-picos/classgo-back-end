import { User } from "../models/index.js"

export const findAll = async (_, res) => {
    try {
        const users = await User.findAll()
    
        return res.status(200).send(users)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const userId = req.userId

    try {
        const user = await User.findOne({where: {id: userId}})
    
        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const {name, email} = req.body

    try {
        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }
    
        else if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }
    
        const dbEmail = await User.findOne({where: {email: email}})
    
        if (dbEmail) {
            return res.status(400).send("Usuário já cadastrado!")
        }
    
        const user = await User.update({name: name, email: email}, {where: {id: id}})
    
        return res.status(200).send("Usuário atualizado com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req, res) => {
    const id = req.params.id

    try {
        await User.destroy({where: {id: id}})
    
        return res.status(200).send("Conta excluida com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
