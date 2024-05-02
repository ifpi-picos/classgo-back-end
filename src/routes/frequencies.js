import { create, findAll, update } from "../controllers/frequencies.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const frequencyRouter = Router()

frequencyRouter.post("/", verifyToken, async (req, res) => {
    try {
        const {frequencies, classId} = req.body
        
       await create(frequencies, classId)

       return res.status(201).send("Lição registrada com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

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

frequencyRouter.put("/", verifyToken, async (req, res) => {
    try {
        const {frequencies, classId} = req.body
        
       await update(frequencies, classId)

       return res.status(200).send("Lição atualizada com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

export default frequencyRouter
