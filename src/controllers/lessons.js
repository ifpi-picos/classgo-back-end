import Lesson from "../models/lessons.js"
import Student from "../models/students.js"

export const create = async (description, date, frequency, classId) => {
    try {
        const lesson = await Lesson.findOne({where: {description, classId}})

        if (lesson) {
            throw new Error("Aula já registrada!")
        }
        
        for (let index = 0; index < frequency.length; index++) {
            const studentName = frequency[index].studentName
            const presence = frequency[index].presence
            
            if (presence === true) {
                const student = await Student.findOne({where: {name: studentName, classId}})
                
                await student.increment("numberOfPresences", {by: 1})
            }
        }

        await Lesson.create({description, date, frequency, classId})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findAll = async (classId) => {
    try {
        return await Lesson.findAll({attributes: ["id", "description", "date", "frequency"], order: [["id", "ASC"]], where: {classId}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (id, description, date, frequency, classId) => {
    try {
        const lesson = await Lesson.findOne({where: {description, classId}})

        if (lesson && id != lesson.id) {
            throw new Error("Aula já registrada!")
        }

        for (let index = 0; index < frequency.length; index++) {
            const studentName = frequency[index].studentName
            const presence = frequency[index].presence
                        
            if (presence === true && presence !== lesson.frequency[index].presence) {
                const student = await Student.findOne({where: {name: studentName, classId}})
                
                await student.increment("numberOfPresences", {by: 1})
            }

            else if (presence === false && presence !== lesson.frequency[index].presence) {
                const student = await Student.findOne({where: {name: studentName, classId}})
                
                await student.decrement("numberOfPresences", {by: 1})
            }
        }

        await Lesson.update({description, date, frequency}, {where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
