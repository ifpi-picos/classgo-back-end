import { createTransport } from "nodemailer"
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/users.js"

export const signUp = async (req, res) => {
    const {name, email, type, password, confirmPassword} = req.body

    try {
        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }
    
        else if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }
    
        else if (!password) {
            return res.status(400).send("Campo senha obrigatório!")
        }
    
        else if (!confirmPassword) {
            return res.status(400).send("Campo confirmar senha obrigatório!")
        }
    
        else if (password != confirmPassword) {
            return res.status(400).send("Campos senha e confirmar senha distintos!")
        }
    
        const dbEmail = await User.findOne({where: {email: email}})
    
        if (dbEmail) {
            return res.status(400).send("Usuário já cadastrado!")
        }
    
        const dbPassword = await hash(password, 8)
    
        await User.create({name, email, type, password: dbPassword})
    
        return res.status(201).send("Usuário cadastrado com sucesso!")
       
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }
        
        else if (!password) {
            return res.status(400).send("Campo senha obrigatório!")
        }
        
        const user = await User.findOne({where: {email: email}})
    
        if (!user) {
            return res.status(400).send("Usuário não cadastrado!")
        }
    
        const isMatch = await compare(password, user.password)
    
        if (!isMatch) {
            return res.status(400).send("Senha inválida!")
        }
    
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    
        return res.status(200).send({token: token, userType: user.type})
        
    } catch (error) {
        res.status(500).send(error)
    }   
}

export const requestNewPassword = async (req, res) => {
    const {email} = req.body

    try {
        if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }
    
        const user = await User.findOne({where: {email: email}})
    
        if (!user) {
            return res.status(400).send("Usuário não cadastrado!")
        }

        const pass = process.env.APP_PASSWORD
    
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: 120})
    
        const message = "Pedido de solicitação enviado para seu email!"
    
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {user: "idcursoproject@gmail.com", pass: `${pass}`}
        })

        const mailOptions = {
            from: "idCurso <idcursoproject@gmail.com>",
            to: `${user.email}`,
            subject: "Solicitação de Alteração de Senha",
            html: `
                    <p>
                        Olá, ${user.name}!
                    <p/>
    
                    <p>
                        Acesse o link para alterar sua senha: <a href="https://idcurso.vercel.app/redefinepassword">Alterar Senha<a/>
                    <p/>
                `
        }
    
        await transport.sendMail(mailOptions)
    
        return res.status(200).send({token: token, message: message})
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const redefinePassword = async (req, res) => {
    const {id} = req.params
    const {newPassword, confirmNewPassword} = req.body

    try {
        if (!newPassword) {
            return res.status(400).send("Campo senha atual obrigatório!")
        }
        
        else if (!confirmNewPassword) {
            return res.status(400).send("Campo nova senha obrigatório!")
        }
    
        else if (newPassword != confirmNewPassword) {
            return res.status(400).send("Campos nova senha e confirmar nova senha distintos!")
        }
    
        const dbPassword = await hash(newPassword, 8)
    
        await User.update({password: dbPassword}, {where: {id: id}})
    
        return res.status(200).send("Senha redefinida com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }    
}

export const findAll = async (_, res) => {
    try {
        const users = await User.findAll()
    
        return res.status(200).send(users)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const userId = req.userId

    try {
        const user = await User.findOne({where: {id: userId}})
    
        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const {name, email} = req.body

    try {
        if (!name) {
            return res.status(400).send("Campo nome obrigatório!")
        }
    
        else if (!email) {
            return res.status(400).send("Campo email obrigatório!")
        }
    
        const dbEmail = await User.findOne({where: {email: email}})
    
        if (dbEmail) {
            return res.status(400).send("Usuário já cadastrado!")
        }
    
        const user = await User.update({name: name, email: email}, {where: {id: id}})
    
        return res.status(200).send("Usuário atualizado com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req, res) => {
    const id = req.params.id

    try {
        await User.destroy({where: {id: id}})
    
        return res.status(200).send("Conta excluida com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
