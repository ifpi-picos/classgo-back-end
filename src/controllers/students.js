import Student from "../models/students.js"

export const create = async (name, classId) => {
    try {
        const student = await Student.findOne({where: {name, classId}})

        if (student) {
            throw new Error("Aluno já adicionado!")
        }

        await Student.create({name, classId})
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

        await Student.update({name}, {where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const destroy = async (id) => {
    try {
        await Student.destroy({where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
