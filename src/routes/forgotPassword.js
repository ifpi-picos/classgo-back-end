import { Router } from "express"
import requestNewPassword from "../controllers/forgotPassword.js"

const forgotPasswordRouter = Router()

forgotPasswordRouter.post("/", requestNewPassword)

export default forgotPasswordRouter
