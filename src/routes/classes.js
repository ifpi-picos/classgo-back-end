import { Router } from "express"
import { create, destroy, findAll, update } from "../controllers/classes.js"
import verifyToken from "../middlewares/auth.js"

const classRouter = Router()

classRouter.post("/", verifyToken, create)
classRouter.get("/", verifyToken, findAll)
classRouter.put("/:id", verifyToken, update)
classRouter.delete("/:id", verifyToken, destroy)

export default classRouter
