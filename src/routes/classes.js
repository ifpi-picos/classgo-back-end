import { Router } from "express"
import { create, destroy, findAll, update } from "../controllers/classes.js"

const classRouter = Router()

classRouter.post("/", create)
classRouter.get("/", findAll)
classRouter.put("/:id", update)
classRouter.delete("/:id", destroy)

export default classRouter
