import Class from "../models/classes.js"

export const create = async (req, res) => {
    const {description, userId} = req.body

    if (!description) {
        return res.status(400).send("Campo nome do curso obrigatório!")
    }

    await Class.create({description, userId})

    return res.status(201).send("Curso criado com sucesso!")
}

export const read = async (req, res) => {
    const {userId} = req.body

    const classes = await Class.findAll({where: {userId: userId}})

    return res.status(200).send(classes)
}
