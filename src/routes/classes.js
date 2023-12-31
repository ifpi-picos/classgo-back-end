import { Router } from "express"
import { create, destroy, findAll, findOne, update } from "../controllers/classes.js"
import verifyToken from "../middlewares/auth.js"

const classRouter = Router()

classRouter.post("/create", verifyToken, create)
classRouter.get("/findAll", verifyToken, findAll)
classRouter.get("/findOne/:description", verifyToken, findOne)
classRouter.put("/update/:id", verifyToken, update)
classRouter.delete("/destroy/:id", verifyToken, destroy)

export default classRouter
