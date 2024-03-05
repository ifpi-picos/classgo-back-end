import Class from "../models/classes.js"
import Lesson from "../models/lessons.js"
import Register from "../models/registers.js"
import Student from "../models/students.js"

export const create = async (req, res) => {
    const userId = req.userId
    const {description, totalNumberOfLessons, totalNumberOfStudents} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo nome da turma obrigatório!")
        }

        else if (!totalNumberOfLessons) {
            return res.status(400).send("Campo total de aulas obrigatório!")
        }

        else if (!totalNumberOfStudents) {
            return res.status(400).send("Campo total de alunos obrigatório!")
        }

        const dbClasse = await Class.findOne({where: {description: description, userId: userId}})

        if (dbClasse) {
            return res.status(400).send("Turma já criada!")
        }
    
        await Class.create({description, totalNumberOfLessons, totalNumberOfStudents, userId})
    
        return res.status(201).send("Turma criada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findAll = async (req, res) => {
    const userId = req.userId

    try {
        const myClasses = await Class.findAll({where: {userId: userId}})
    
        return res.status(200).send(myClasses)
              
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const description = req.params.description
    const userId = req.userId

    try {      
        const myClass = await Class.findOne({where: {description: description, userId: userId}})
    
        return res.status(200).send(myClass)

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    const {description, totalNumberOfLessons, totalNumberOfStudents} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo nome da turma obrigatório!")
        }

        else if (!totalNumberOfLessons) {
            return res.status(400).send("Campo total de aulas obrigatório!")
        }

        else if (!totalNumberOfStudents) {
            return res.status(400).send("Campo total de alunos obrigatório!")
        }

        const dbClasse = await Class.findOne({where: {description: description, userId: userId}})

        if (dbClasse) {
            return res.status(400).send("Turma já criada!")
        }
    
        await Class.update({description: description, totalNumberOfLessons: totalNumberOfLessons, totalNumberOfStudents: totalNumberOfStudents}, {where: {id: id}})
    
        return res.status(200).send("Turma editada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req, res) => {
    const id = req.params.id

    try {
        await Register.destroy({where: {classId: id}})
        await Lesson.destroy({where: {classId: id}})
        await Student.destroy({where: {classId: id}})
        await Class.destroy({where: {id: id}})
    
        return res.status(200).send("Turma excluida com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
