import Frequency from "../models/frequencies.js"
import Student from "../models/students.js"

export const create = async (req, res) => {
    const {name, numberOfpresencies, classId} = req.body

    try {
        if (!name) {
            return res.status(400).send("Campo nome do aluno obrigátorio!")
        }

        const student = await Student.findOne({where: {name: name, classId: classId}})

        if (student) {
            return res.status(400).send("Aluno já adicionado!")
        }

        await Student.create({name, numberOfpresencies, classId})

        return res.status(201).send("Aluno adicionado com sucesso!")

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findAll = async (req, res) => {
    const classId = req.params.classId

    try {
        const students = await Student.findAll({where: {classId: classId}})

        return res.status(200).send(students)

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const id = req.params.id

    try {
        const student = await Student.findOne({where: {id: id}})

        return res.status(200).send(student)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const {name, numberOfpresencies, classId} = req.body

    try {
        if (!name) {
            return res.status(400).send("Campo nome do aluno obrigatório!")
        }

        const student = await Student.findOne({where: {name: name, classId: classId}})

        if (student && id != student.id) {
            return res.status(400).send("Aluno já adicionado!")
        }

        await Student.update({name, numberOfpresencies}, {where: {id: id}})

        return res.status(200).send("Aluno atualizado com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req, res) => {
    const id = req.params.id

    try {
        await Frequency.destroy({where: {studentId: id}})
        await Student.destroy({where: {id: id}})

        return res.status(200).send("Aluno excluido com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
