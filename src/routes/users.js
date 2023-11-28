import { Router } from "express"
import {destroy, findAll, findOne, update} from "../controllers/users.js"
import verifyToken from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get("/self", verifyToken, findOne)
userRouter.get("/", verifyToken, findAll)
userRouter.put("/update/:id", verifyToken, update)
userRouter.delete("/delete/:id", verifyToken, destroy)

export default userRouter
