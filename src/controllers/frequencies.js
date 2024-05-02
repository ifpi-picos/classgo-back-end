import Frequency from "../models/frequencies.js"
import Student from "../models/students.js"

export const create = async (frequencies, classId) => {
    try {
        for (let index = 0; index < frequencies.length; index++) {
            const studentName = frequencies[index].studentName
            const presence = frequencies[index].presence
            const lessonId = frequencies[index].lessonId
            
            await Frequency.create({studentName, presence, lessonId})

            if (presence === true) {
                const student = await Student.findOne({where: {name: studentName, classId}})
                await student.increment("numberOfPresences", {by: 1})
            }
        }
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findAll = async (lessonId) => {
    try {
        return await Frequency.findAll({attributes: ["id", "studentName", "presence"], order: [["id", "ASC"]], where: {lessonId}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (frequencies, classId) => {
    try {
        for (let index = 0; index < frequencies.length; index++) {
            const id = frequencies[index].id
            const studentName = frequencies[index].studentName
            const presence = frequencies[index].presence
            
            const frequency = await Frequency.findByPk(id)
            
            await Frequency.update({presence}, {where: {id}})

            if (presence === true && presence !== frequency.presence) {
                const student = await Student.findOne({where: {name: studentName, classId}})
                
                await student.increment("numberOfPresences", {by: 1})
            }

            else if (presence === false && presence !== frequency.presence) {
                const student = await Student.findOne({where: {name: studentName, classId}})
                
                await student.decrement("numberOfPresences", {by: 1})
            }
        }
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
