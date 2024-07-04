import Class from "../models/classes.js"
import Lesson from "../models/lessons.js"
import Student from "../models/students.js"

export const create = async (description, userId) => {
    try {
        const myClass = await Class.findOne({where: {description, userId}})

        if (myClass) {
            throw new Error("Turma já criada!")
        }

        await Class.create({description, userId})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findAll = async (userId) => {
    try {
        return await Class.findAll({attributes: ["id", "description", "numberOfStudents"], order: [["description", "ASC"]], where: {userId}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findOne = async (description, userId) => {
    try {
        return await Class.findOne({attributes: ["id", "description", "numberOfStudents"], where: {description, userId}})
    }

    catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (id, description, userId) => {
    try {
        const myClass = await Class.findOne({where: {description, userId}})

        if (myClass && id != myClass.id) {
            throw new Error("Turma já criada!")
        }

        await Class.update({description}, {where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const destroy = async (id) => {
    try {
        await Lesson.destroy({where: {classId: id}})
        await Student.destroy({where: {classId: id}})
        await Class.destroy({where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
