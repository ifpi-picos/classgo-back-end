import { Router } from "express"
import {destroy, findAll, findOne, update} from "../controllers/users.js"

const userRouter = Router()

userRouter.get("/:id", findOne)
userRouter.get("/", findAll)
userRouter.put("/:id", update)
userRouter.delete("/:id", destroy)


export default userRouter
