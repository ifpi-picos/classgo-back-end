import { create, destroy, findAll, findOne, update } from "../controllers/classes.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const classRouter = Router()

classRouter.post("/", verifyToken, async (req, res) => {
    try {
        const userId = req.userId
        const description = req.body.description

        if (!description) {
            res.status(400).send("Campo descrição da turma obrigatório!")
        }

        await create(description, userId)

        res.status(201).send("Turma criada com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message)
    }
})

classRouter.get("/", verifyToken, async (req, res) => {
    try {
        const userId = req.userId

        const classes = await findAll(userId)

        res.status(200).send(classes)
    }
    
    catch (err) {
        res.status(400).send(err.message)
    }
})

classRouter.get("/:description", verifyToken, async (req, res) => {
    try {
        const description = req.params.description
        const userId = req.userId

        const myClass = await findOne(description, userId)

        res.status(200).send(myClass)
    }
    
    catch (err) {
        res.status(400).send(err.message)
    }
})

classRouter.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const description = req.body.description

        if (!description) {
            res.status(400).send("Campo descrição da turma obrigatório!")
        }

        await update(id, description)

        res.status(200).send("Turma atualizada com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message)
    }
})

classRouter.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id

        await destroy(id)

        res.status(200).send("Tuurma excluida com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message)
    }
})

export default classRouter
