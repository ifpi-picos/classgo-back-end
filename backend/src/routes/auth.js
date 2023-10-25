import { Router } from "express"
import auth from "../controllers/auth.js"

const authRouter = Router()

authRouter.post("/signup", auth.signUp)
authRouter.post("/", auth.signIn)

export default authRouter
