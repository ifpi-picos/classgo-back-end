import Course from "../models/courses.js"

export const create = async (req, res) => {
    const {description, userId} = req.body

    if (!description) {
        return res.status(400).send("Campo nome do curso obrigatório!")
    }

    await Course.create({description, userId})

    return res.status(201).send("Curso criado com sucesso!")
}

export const read = async (req, res) => {
    const {userId} = req.body

    const course = await Course.findOne({
        attributes: ["description"], where: {userId: userId}
    })

    return res.status(200).send(course)
}
