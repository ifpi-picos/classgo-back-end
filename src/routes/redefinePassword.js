import redefinePassword from "../controllers/redefinePassword.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const redefinePasswordRouter = Router()

redefinePasswordRouter.put("/:id", verifyToken, redefinePassword)

export default redefinePasswordRouter
