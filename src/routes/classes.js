import { Router } from "express"
import { create, destroy, findAll, findOne, update } from "../controllers/classes.js"
import verifyToken from "../middlewares/auth.js"

const classRouter = Router()

classRouter.post("/create", verifyToken, create)
classRouter.get("/all", verifyToken, findAll)
classRouter.get("/one/:description", verifyToken, findOne)
classRouter.put("/update/:id", verifyToken, update)
classRouter.delete("/delete/:id", verifyToken, destroy)

export default classRouter
