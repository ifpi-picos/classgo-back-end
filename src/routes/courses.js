import { Router } from "express"
import { create, read } from "../controllers/courses.js"

const courseRouter = Router()

courseRouter.post("/", create)
courseRouter.get("/", read)

export default courseRouter
