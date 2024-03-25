import Frequency from "../models/frequencies.js"

export const create = async (req, res) => {
    const {studentsId, presencies, lessonId, classId} = req.body

    try {
        for (let index = 0; index < studentsId.length; index++) {
            const studentId = studentsId[index]
            const presence = presencies[index]

            await Frequency.create({studentId, presence, lessonId, classId})
        }

        return res.status(201).send("Aula registrada com sucesso!")

    } catch (error) {
        return res.status(500).send(error)
    }
}
