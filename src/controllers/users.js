import { APP_PASSWORD, JWT_SECRET } from "../config/dotenv.js"
import { compare, hash } from "bcrypt"
import { createTransport } from "nodemailer"
import jwt from "jsonwebtoken"
import User from "../models/users.js"

export const create = async (name, email, type, password) => {
    try {
        const user = await User.findOne({where: {email}})
        
        if (user) {
            throw new Error("Usuário já cadastrado!")
        }
        
        password = await hash(password, 8)
        
        await User.create({name, email, type, password})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const signIn = async (email, password) => {
    try {
        const user = await User.findOne({where: {email}})
        
        if (!user) {
            throw new Error("Usuário não cadastrado!")
        }
        
        const isMatch = await compare(password, user.password)

        if (!isMatch) {
            throw new Error("Senha inválida!")
        }
        
        return jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: "2d"})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const forgotPassword = async (email) => {
    try {
        const user = await User.findOne({where: {email}})
        
        if (!user) {
            throw new Error("Usuário não cadastrado!")
        }

        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: 3600})
        
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {user: "idcursoproject@gmail.com", pass: `${APP_PASSWORD}`}
        })
        
        const message = "Pedido de solicitação enviado para seu email!"

        const mailOptions = {
            from: "idCurso <idcursoproject@gmail.com>",
            to: `${user.email}`,
            subject: "Solicitação de Alteração de Senha",
            html: `
                    <p>
                        Olá, ${user.name}!
                    <p/>

                    <p>
                        Acesse o link para alterar sua senha: <a href="https://idcurso.vercel.app/redefinepassword/${user.id}">Alterar Senha<a/>
                    <p/>
                `
        }
    
        await transport.sendMail(mailOptions)
    
        return {token, message}
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const redefinePassword = async (id, newPassword) => {
    try {
        newPassword = await hash(newPassword, 8)

        await User.update({password: newPassword}, {where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findAll = async () => {
    try {
        return await User.findAll({attributes: ["id", "name", "email"], order: [["name", "ASC"]]})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const findByPk = async (id) => {
    try {
        return await User.findByPk(id, {attributes: ["id", "name", "email"]})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (id, name, email) => {
    try {
        const user = await User.findByPk(id)

        if (user && id != user.id) {
            throw new Error("Usuário já cadastrado!")
        }

        await User.update({name, email}, {where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}

export const destroy = async (id) => {
    try {
        await User.destroy({where: {id}})
    }
    
    catch (err) {
        throw new Error(err.message)
    }
}
