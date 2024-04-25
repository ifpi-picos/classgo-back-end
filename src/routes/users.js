import { create, destroy, findAll, findByPk, forgotPassword, redefinePassword, signIn, update } from "../controllers/users.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const userRouter = Router()

userRouter.post("/", async (req, res) => {
    try {
        const {name, email, type, password, confirmPassword} = req.body

        if (!name) {
            res.status(400).send("Campo nome obrigatório!")
        }
    
        else if (!email) {
            res.status(400).send("Campo email obrigatório!")
        }

        else if (!type) {
            res.status(400).send("Campo tipo de usuário obrigatório!")
        }
    
        else if (!password) {
            res.status(400).send("Campo senha obrigatório!")
        }
    
        else if (!confirmPassword) {
            res.status(400).send("Campo confirmar senha obrigatório!")
        }
    
        else if (password != confirmPassword) {
            res.status(400).send("Campos senha e confirmar senha distintos!")
        }

        await create(name, email, type, password)

        res.status(201).send("Usuário cadastrado com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message)   
    }
})

userRouter.post("/signin", async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email) {
            res.status(400).send("Campo email obrigatório!")
        }
        
        else if (!password) {
            res.status(400).send("Campo senha obrigatório!")
        }

        const token = await signIn(email, password)

        res.status(200).send(token)
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

userRouter.post("/forgotpassword", async (req, res) => {
    try {
        const email = req.body.email

        if (!email) {
            res.status(400).send("Campo email obrigatório!")
        }

        const mail = await forgotPassword(email)

        res.status(200).send(mail)
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

userRouter.post("/redefinepassword/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const {newPassword, confirmNewPassword} = req.body

        if (!newPassword) {
            res.status(400).send("Campo nova senha obrigatório!")
        }
        
        else if (!confirmNewPassword) {
            res.status(400).send("Campo confirmar nova senha obrigatório!")
        }
    
        else if (newPassword != confirmNewPassword) {
            res.status(400).send("Campos nova senha e confirmar nova senha distintos!")
        }

        await redefinePassword(id, newPassword)

        res.status(200).send("Senha redefinida com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

userRouter.get("/", verifyToken, async (_, res) => {
    try {
        const users = await findAll()

        res.status(200).send(users)
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

userRouter.get("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id

        const user = await findByPk(id)

        res.status(200).send(user)
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

userRouter.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const {name, email} = req.body

        if (!name) {
            res.status(400).send("Campo nome obrigatório!")
        }
    
        else if (!email) {
            res.status(400).send("Campo email obrigatório!")
        }

        await update(id, name, email)

        res.status(200).send("Usuário atualizado com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

userRouter.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id

        await destroy(id)

        res.status(200).send("Conta excluida com sucesso!")
    }
    
    catch (err) {
        res.status(400).send(err.message) 
    }
})

export default userRouter
