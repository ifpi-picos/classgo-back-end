import { Router } from "express"
import { create, read } from "../controllers/classes.js"

const classRouter = Router()

classRouter.post("/", create)
classRouter.get("/", read)

export default classRouter
