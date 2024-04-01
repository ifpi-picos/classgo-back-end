import Frequency from "../models/frequencies.js"

export const findAll = async (req, res) => {
    const classId = req.params.classId

    try {
        const frequencies = await Frequency.findAll({where: {classId: classId}})

        return res.status(200).send(frequencies)

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const lessonId = req.params.lessonId

    try {
        const frequency = await Frequency.findAll({where: {lessonId: lessonId}})

        return res.status(200).send(frequency)

    } catch (error) {
        return res.status(500).send(error)
    }
}
