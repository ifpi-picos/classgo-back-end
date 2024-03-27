import Frequency from "../models/frequencies.js"

export const create = async (req, res) => {
    const {frequencies} = req.body

    try {
        for (let index = 0; index < frequencies.length; index++) {
            const studentId = frequencies[index].studentId
            const presence = frequencies[index].presence
            const lessonId = frequencies[index].lessonId
            const classId = frequencies[index].classId
            
            await Frequency.create({studentId, presence, lessonId, classId})
        }

        return res.status(201).send("Aula registrada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findAll = async (req, res) => {
    const lessonId = req.params.lessonId

    try {
        const frequency = await Frequency.findAll({where: {lessonId: lessonId}})

        return res.status(200).send(frequency)

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const lessonId = req.params.lessonId
    const {frequencies} = req.body

    try {
        for (let index = 0; index < frequencies.length; index++) {
            const studentId = frequencies[index].studentId
            const presence = frequencies[index].presence
            
            await Frequency.update({presence}, {where: {studentId: studentId, lessonId: lessonId}})
        }

        return res.status(200).send("Aula atualizada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
