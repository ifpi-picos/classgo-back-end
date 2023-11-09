import { Router } from "express"
import { create, read } from "../controllers/courses.js"
import verifyToken from "../middlewares/auth.js"

const courseRouter = Router()

courseRouter.post("/", verifyToken, create)
courseRouter.get("/", read)

export default courseRouter
