import { Router } from "express"
import middleware from "../middlewares/auth.js"
import auth from "../controllers/auth.js"

const authRouter = Router()

authRouter.post("/signup", middleware.validateSignUp, auth.signUp)
authRouter.post("/", middleware.validateSignIn, auth.signIn)

export default authRouter
