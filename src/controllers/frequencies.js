import Frequency from "../models/frequencies.js"

export const create = async (req, res) => {
    const {studentsId, presencies, lessonId, classId} = req.body
    console.log(studentsId)
    console.log(presencies)
    console.log(lessonId)
    console.log(classId)

    try {
        for (let index = 0; index < studentsId.length; index++) {
            const studentId = studentsId[index]
            const presence = presencies[index]
            console.log(studentId)
            console.log[(presence)]

            await Frequency.create({studentId, presence, lessonId, classId})
        }

        return res.status(201).send("Aula registrada com sucesso!")

    } catch (error) {
        return res.status(500).send(error)
    }
}
