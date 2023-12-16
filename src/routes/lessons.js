import { Router } from "express"
import { create, findAll, findOne, update } from "../controllers/lessons.js"
import verifyToken from "../middlewares/auth.js"

const lessonRouter = Router()

lessonRouter.post("/create", verifyToken, create)
lessonRouter.get("/all/:classId", verifyToken, findAll)
lessonRouter.get("/one/:id", verifyToken, findOne)
lessonRouter.patch("/update/:id", verifyToken, update)

export default lessonRouter
