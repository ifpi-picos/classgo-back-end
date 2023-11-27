import { Router } from "express"
import {destroy, findAll, findOne, update} from "../controllers/users.js"
import verifyToken from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get("/:id", verifyToken, findOne)
userRouter.get("/", verifyToken, findAll)
userRouter.put("/", verifyToken, update)
userRouter.delete("/", verifyToken, destroy)

export default userRouter
