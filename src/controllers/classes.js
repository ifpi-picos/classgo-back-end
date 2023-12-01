import Class from "../models/classes.js"

export const create = async (req, res) => {
    const userId = req.userId
    const {description} = req.body

    if (!description) {
        return res.status(400).send("Campo nome da turma obrigatório!")
    }

    await Class.create({description, userId})

    return res.status(201).send("Turma criada com sucesso!")
}

export const findOne = async (req, res) => {
    const id = req.params.id

    const myClass = await Class.findOne({where: {id: id}})

    return res.status(200).send(myClass)
}

export const findAll = async (req, res) => {
    const userId = req.userId

    const myClasses = await Class.findAll({where: {userId: userId}})

    return res.status(200).send(myClasses)
}

export const update = async (req, res) => {
    const id = req.params.id
    const {description} = req.body

    if (!description) {
        return res.status(400).send("Campo nome da turma obrigatório")
    }

    await Class.update({description: description}, {where: {id: id}})

    return res.status(200).send("Turma editada com sucesso!")
}

export const destroy = async (req, res) => {
    const id = req.params.id

    await Class.destroy({where: {id: id}})

    return res.status(200).send("Turma excluida com sucesso!")
}
