import redefinePassword from "../controllers/redefinePassword.js"
import { Router } from "express"

const redefinePasswordRouter = Router()

redefinePasswordRouter.put("/", redefinePassword)

export default redefinePasswordRouter
