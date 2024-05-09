import { create, destroy, findByPk, forgotPassword, redefinePassword, signIn, update } from "../controllers/users.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const userRouter = Router()

userRouter.post("/", async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body

        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }

        else if (name.length < 3 || name.length > 30) {
            return res.status(400).send("Campo nome deve conter entre 3 e 30 caracteres!")
        }

        else if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }

        else if (email.length < 12 || email.length > 60) {
            return res.status(400).send("Campo email deve conter entre 12 e 60 caracteres!")
        }
        
        else if (!password) {
            return res.status(400).send("Campo senha obrigatório!")
        }

        else if (password.length < 6 || password.length > 18) {
            return res.status(400).send("Campo senha deve conter entre 6 e 18 caracteres!")
        }
        
        else if (!confirmPassword) {
            return res.status(400).send("Campo confirmar senha obrigatório!")
        }
        
        else if (confirmPassword.length < 6 || confirmPassword.length > 18) {
            return res.status(400).send("Campo confirmar senha deve conter entre 6 e 18 caracteres!")
        }
        
        else if (password != confirmPassword) {
            return res.status(400).send("Campos senha e confirmar senha distintos!")
        }

        await create(name, email, password)

        return res.status(201).send("Usuário cadastrado com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

userRouter.post("/signin", async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }

        else if (email.length > 60) {
            return res.status(400).send("Campo email deve conter no máximo 60 caracteres!")
        }
        
        else if (!password) {
            return res.status(400).send("Campo senha obrigatório!")
        }

        else if (password.length > 18) {
            return res.status(400).send("Campo senha deve conter no máximo 18 caracteres!")
        }

        const token = await signIn(email, password)

        return res.status(200).send(token)
    }
    
    catch (err) {
        return res.status(400).send(err.message) 
    }
})

userRouter.post("/forgotpassword", async (req, res) => {
    try {
        const email = req.body.email

        if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }

        else if (email.length > 60) {
            return res.status(400).send("Campo email deve conter no máximo 60 caracteres!")
        }

        const token = await forgotPassword(email)

        return res.status(200).send(token)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

userRouter.post("/redefinepassword/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const {password, confirmPassword} = req.body

        if (!password) {
            return res.status(400).send("Campo nova senha obrigatório!")
        }

        else if (password.length < 6 || password.length > 18) {
            return res.status(400).send("Campo nova senha deve conter entre 6 e 18 caracteres!")
        }
        
        else if (!confirmPassword) {
            return res.status(400).send("Campo confirmar nova senha obrigatório!")
        }

        else if (confirmPassword.length < 6 || confirmPassword.length > 18) {
            return res.status(400).send("Campo confirmar nova senha deve conter entre 6 e 18 caracteres!")
        }
        
        else if (password != confirmPassword) {
            return res.status(400).send("Campos nova senha e confirmar nova senha distintos!")
        }

        await redefinePassword(id, password)

        return res.status(200).send("Senha redefinida com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

userRouter.get("/", verifyToken, async (req, res) => {
    try {
        const id = req.userId

        const user = await findByPk(id)

        return res.status(200).send(user)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

userRouter.put("/", verifyToken, async (req, res) => {
    try {
        const id = req.userId
        const {name, email} = req.body

        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }

        else if (name.length < 3 || name.length > 30) {
            return res.status(400).send("Campo nome deve conter entre 3 e 30 caracteres!")
        }
    
        else if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }

        else if (email.length < 12 || email.length > 60) {
            return res.status(400).send("Campo email deve conter entre 12 e 60 caracteres!")
        }

        await update(id, name, email)

        return res.status(200).send("Usuário atualizado com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

userRouter.delete("/", verifyToken, async (req, res) => {
    try {
        const id = req.userId

        await destroy(id)

        return res.status(200).send("Conta excluida com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

export default userRouter
