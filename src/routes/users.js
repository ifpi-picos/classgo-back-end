import { Router } from "express"
import {destroy, findAll, findOne, update} from "../controllers/users.js"
import verifyToken from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get("/findAll", verifyToken, findAll)
userRouter.get("/findOne", verifyToken, findOne)
userRouter.put("/update/:id", verifyToken, update)
userRouter.delete("/destroy/:id", verifyToken, destroy)

export default userRouter
