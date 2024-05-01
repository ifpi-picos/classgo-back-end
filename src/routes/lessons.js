import { addFrequency, editFrequency } from "../controllers/frequencies.js"
import { create, findAll, update } from "../controllers/lessons.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const lessonRouter = Router()

lessonRouter.post("/", verifyToken, async (req, res) => {
    try {
        const {description, date, frequencies, classId} = req.body

        if (!description) {
            return res.status(400).send("Campo descrição obrigatório!")
        }

        else if (description.length < 3 || description > 60) {
            return res.status(400).send("Campo descrição deve conter entre 3 e 60 caracteres!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        const lessonId = await create(description, date, classId)

        await addFrequency(frequencies, lessonId, classId)

        return res.status(201).send("Lição registrada com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

lessonRouter.get("/:classId", verifyToken, async (req, res) => {
    try {
        const classId = req.params.classId

        const lessons = await findAll(classId)

        return res.status(200).send(lessons)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

lessonRouter.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const {description, date, frequencies, classId} = req.body

        if (!description) {
            return res.status(400).send("Campo descrição obrigatório!")
        }

        else if (description.length < 3 || description > 60) {
            return res.status(400).send("Campo descrição deve conter entre 3 e 60 caracteres!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        await update(id, description, date, classId)

        await editFrequency(frequencies, classId)

        return res.status(200).send("Lição atualizada com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

export default lessonRouter
