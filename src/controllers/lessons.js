import Lesson from "../models/lessons.js"

export const create = async (req, res) => {
    const {description, date, classId} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo descrição da aula obrigatório!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        const lesson = await Lesson.findOne({where: {description: description, classId: classId}})

        if (lesson) {
            return res.status(400).send("Aula já registrada!")
        }
        
        await Lesson.create({description, date, classId})

        return res.status(201).send("Aula registrada com sucesso!")

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findAll = async (req, res) => {
    const classId = req.params.classId

    try {
        const lessons = await Lesson.findAll({where: {classId: classId}})

        return res.status(200).send(lessons)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const id = req.params.id

    try {
        const lesson = await Lesson.findOne({where: {id: id}})

        return res.status(200).send(lesson)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const {description, date, classId} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo descrição da aula obrigatório!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        const lesson = await Lesson.findOne({where: {description: description, classId: classId}})

        if (lesson && id != lesson.id) {
            return res.status(400).send("Aula já registrada!")
        }

        await Lesson.update({description, date}, {where: {id: id}})
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
