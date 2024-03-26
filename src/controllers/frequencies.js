import Frequency from "../models/frequencies.js"

export const findAll = async (req, res) => {
    const lessonId = req.params.lessonIdd

    try {
        const frequency = await Frequency.findAll({where: {lessonId: lessonId}})

        return res.status(200).send(frequency)

    } catch (error) {
        return res.status(500).send(error)
    }
}
