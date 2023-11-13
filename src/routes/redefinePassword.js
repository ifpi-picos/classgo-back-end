import redefinePassword from "../controllers/redefinePassword.js"
import { Router } from "express"

const redefinePasswordRouter = Router()

redefinePasswordRouter.put("/:id", redefinePassword)

export default redefinePasswordRouter
