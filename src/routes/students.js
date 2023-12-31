import { Router } from "express"
import { create, destroy, findAll, findOne, update } from "../controllers/students.js"
import verifyToken from "../middlewares/auth.js"

const studentRouter = Router()

studentRouter.post("/create", verifyToken, create)
studentRouter.get("/findAll/:classId", verifyToken, findAll)
studentRouter.get("/findOne/:id", verifyToken, findOne)
studentRouter.put("/update/:id", verifyToken, update)
studentRouter.delete("/destroy/:id", verifyToken, destroy)

export default studentRouter
