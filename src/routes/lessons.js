import { Router } from "express"
import { create, findAll, findOne, update } from "../controllers/lessons.js"
import verifyToken from "../middlewares/auth.js"

const lessonRouter = Router()

lessonRouter.post("/create", verifyToken, create)
lessonRouter.get("/findAll/:classId", verifyToken, findAll)
lessonRouter.get("/findOne/:id", verifyToken, findOne)
lessonRouter.put("/update/:id", verifyToken, update)

export default lessonRouter
