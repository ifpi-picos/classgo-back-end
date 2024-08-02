import Class from "../models/classes.js"
import Lesson from "../models/lessons.js"
import Student from "../models/students.js"

export const create = async (name, classId) => {
    try {
        const student = await Student.findOne({where: {name, classId}})

        if (student) {
            throw new Error("Aluno já adicionado!")
        }

        await Student.create({name, classId})

        const myClass = await Class.findOne({where: {id: classId}})

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
        const frequency = []

        const student = await Student.findOne({where: {name, classId}})

        if (student && id != student.id) {
            throw new Error("Aluno já adicionado!")
        }

        await Student.update({name}, {where: {id}})

        const lessons = await Lesson.findAll({where: {classId}})

        for (let index = 0; index < lessons.length; index++) {
            frequency.push(lessons[index].frequency)            
        }

        for (let index = 0; index < frequency.length; index++) {            
            if (frequency[index].studentName == student.name) {
                frequency[index].studentName = name
            }
        }

        await Lesson.update({frequency}, {where: classId})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const destroy = async (id) => {
    try {
        const student = await Student.findByPk(id)

        const lessons = await Lesson.findAll({where: {classId: student.classId}})
        console.log(lessons)

        for (let index = 0; index < lessons.length; index++) {
            const studentName = lessons[index].frequency.studentName
            console.log(studentName, student.name)
            
            if (studentName == student.name) {
                throw new Error("Aluno adicionado em uma frequência, não pode ser exuido!!")
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
