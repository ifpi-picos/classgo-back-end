import User from "../models/users.js"

export const findOne = async (req, res) => {
    const {id} = req.params

    const user = await User.findOne({where: {id: id}})

    return res.status(200).send(user)
}

export const findAll = async (_, res) => {
    const users = await User.findAll()

    return res.status(200).send(users)
}

export const update = async (req, res) => {
    const {id} = req.params
    const {newName, newEmail} = req.body

    if (!newName) {
        return res.status(400).send("Campo nome obrigatório!")
    }

    else if (!newEmail) {
        return res.status(400).send("Campo email obrigatório!")
    }

    const user = await User.update({name: newName, email: newEmail}, {where: {id: id}})

    return res.status(200).send("Usuário atualizado com sucesso!")
}

export const destroy = async (req, res) => {
    const {id} = req.params

    await User.destroy({where: {id: id}})

    return res.status(200).send("Conta excluida com sucesso!")
}
