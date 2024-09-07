import Class from "../models/classes.js"
import Lesson from "../models/lessons.js"
import Student from "../models/students.js"

export const create = async (name, classId) => {
    try {
        const student = await Student.findOne({where: {name, classId}})

        if (student) {
            throw new Error("Aluno já adicionado!")
        }

        const myClass = await Class.findOne({where: {id: classId}})

        if (myClass.numberOfStudents >= 50) {
            throw new Error("Capacidade de alunos alcançada!")
        }

        await Student.create({name, classId})

        await myClass.increment("numberOfStudents", {by: 1})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findAll = async (classId) => {
    try {
        return await Student.findAll({attributes: ["id", "name", "numberOfPresences"], order: [["name", "ASC"]], where: {classId}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (id, name, classId) => {
    try {
        const student = await Student.findOne({where: {name, classId}})
        
        if (student && id != student.id) {
            throw new Error("Aluno já adicionado!")
        }
        
        const studentInStudents = await Student.findByPk(id)

        const lessons = await Lesson.findAll({where: {classId}})

        for (let index = 0; index < lessons.length; index++) {
            const frequencies = lessons[index].frequency
            const newFrequencies = []

            for (let index = 0; index < frequencies.length; index++) {
                newFrequencies.push(frequencies[index])

                if (studentInStudents.name === newFrequencies[index].studentName) {
                    newFrequencies.splice(index, 1, {studentName: name, presence: newFrequencies[index].presence})
                }
            }
                
            await Lesson.update({frequency: newFrequencies}, {where: {classId}})
        }

        await Student.update({name}, {where: {id}})
    }

    catch (err) {
        throw new Error(err.message)
    }
}

export const destroy = async (id) => {
    try {
        const student = await Student.findByPk(id)

        const lessons = await Lesson.findAll({where: {classId: student.classId}})

        for (let index = 0; index < lessons.length; index++) {
            const frequency = lessons[index].frequency

            for (let index = 0; index < frequency.length; index++) {
                const studentName = frequency[index].studentName
                
                if (student.name === studentName) {
                    throw new Error("Aluno adicionado em uma frequência, não pode ser exuido!!")
                }
            }
        }

        await Student.destroy({where: {id}})

        const myClass = await Class.findOne({where: {id: student.classId}})

        await myClass.decrement("numberOfStudents", {by: 1})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
