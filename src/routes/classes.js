import { Router } from "express"
import { create, destroy, findAll, update } from "../controllers/classes.js"
import verifyToken from "../middlewares/auth.js"

const classRouter = Router()

classRouter.post("/create", verifyToken, create)
classRouter.get("/", verifyToken, findAll)
classRouter.put("/update", verifyToken, update)
classRouter.delete("/delete", verifyToken, destroy)

export default classRouter
