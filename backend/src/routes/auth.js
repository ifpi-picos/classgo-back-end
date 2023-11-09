import { Router } from "express"
import {signUp, signIn} from "../controllers/auth.js"

const authRouter = Router()

authRouter.post("/signup", signUp)
authRouter.post("/", signIn)

export default authRouter
