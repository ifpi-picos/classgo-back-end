import { Router } from "express"
import { findAll } from "../controllers/frequencies.js"
import verifyToken from "../middlewares/auth.js"

const frequencyRouter = Router()

frequencyRouter.use("/findAll/:lessonId", verifyToken, findAll)

export default frequencyRouter
