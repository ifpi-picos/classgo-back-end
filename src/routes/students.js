import { create, destroy, findAll, update } from "../controllers/students.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const studentRouter = Router()

studentRouter.post("/", verifyToken, async (req, res) => {
    try {
        const {name, classId} = req.body

        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }

        else if (name.length < 3 || name.length > 60) {
            return res.status(400).send("Campo nome deve conter entre 3 e 60 caracteres!")
        }

        await create(name, classId)

        return res.status(201).send("Aluno adicionado com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

studentRouter.get("/:classId", verifyToken, async (req, res) => {
    try {
        const classId = req.params.classId

        const students = await findAll(classId)

        return res.status(200).send(students)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

studentRouter.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const name = req.body.name

        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }

        else if (name.length < 3 || name.length > 60) {
            return res.status(400).send("Campo nome deve conter entre 3 e 60 caracteres!")
        }

        await update(id, name)

        return res.status(200).send("Aluno atualizado com sucesso!")
        
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

studentRouter.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id

        await destroy(id)

        return res.status(200).send("Aluno excluido com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

export default studentRouter
