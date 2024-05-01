import Lesson from "../models/lessons.js"

export const create = async (description, date, classId) => {
    try {
        const lesson = await Lesson.findOne({where: {description, classId}})

        if (lesson) {
            throw new Error("Lição já registrada!")
        }

        const newLesson = await Lesson.create({description, date, classId})

        return newLesson.id
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findAll = async (classId) => {
    try {
        return await Lesson.findAll({attributes: ["id", "description", "date"], order: [["id", "ASC"]], where: {classId}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (id, description, date, classId) => {
    try {
        const lesson = await Lesson.findOne({where: {description, classId}})

        if (lesson && id != lesson.id) {
            throw new Error("Lição já registrada!")
        }

        await Lesson.update({description, date}, {where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
