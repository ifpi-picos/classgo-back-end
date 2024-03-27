import { Router } from "express"
import { create, findAll, update } from "../controllers/frequencies.js"
import verifyToken from "../middlewares/auth.js"

const frequencyRouter = Router()

frequencyRouter.post("/create", verifyToken, create)
frequencyRouter.get("/findAll/:lessonId", verifyToken, findAll)
frequencyRouter.put("/update/:lessonId", verifyToken, update)

export default frequencyRouter
