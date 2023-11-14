import Course from "../models/courses.js"

export const create = async (req, res) => {
    const {description, userId} = req.body

    if (!description) {
        return res.status(400).send("Campo Nome do Curso vazio!")
    }

    await Course.create({description, userId})

    return res.status(201).send("Curso criado com sucesso!")
}

export const read = async (req, res) => {
    const {description} = req.body

    const course = await Course.findOne({
        attributes: ["description"], where: {description: description}
    })

    return res.send(course)
}
