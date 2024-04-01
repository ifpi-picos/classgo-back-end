import { Router } from "express"
import { findAll, findOne } from "../controllers/frequencies.js"
import verifyToken from "../middlewares/auth.js"

const frequencyRouter = Router()

frequencyRouter.get("/findAll/:classId", verifyToken, findAll)
frequencyRouter.get("/findOne/:lessonId", verifyToken, findOne)

export default frequencyRouter
