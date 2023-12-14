import { Lesson } from "../models/index.js"

export const create = async (req, res) => {
    const {description, date, classId} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo descrição da aula obrigatório!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
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
        const lessons = Lesson.findAll({where: {classId: classId}})

        return res.status(200).send(lessons)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const id = req.params.id

    try {
        const lesson = Lesson.findOne({where: {id: id}})

        return res.status(200).send(lesson)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const {description, date} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo descrição da aula obrigatório!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        await Lesson.update({description, date}, {where: {id: id}})

        return res.status(200).send("Aula atualizada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
