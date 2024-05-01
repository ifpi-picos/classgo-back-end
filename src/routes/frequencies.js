import { findAll } from "../controllers/frequencies.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const frequencyRouter = Router()

frequencyRouter.get("/:lessonId", verifyToken, async (req, res) => {
    try {
        const lessonId = req.params.lessonId

        const frequencies = await findAll(lessonId)

        return res.status(200).send(frequencies)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

export default frequencyRouter