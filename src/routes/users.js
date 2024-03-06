import { Router } from "express"
import {destroy, findAll, findOne, redefinePassword, requestNewPassword, signIn, signUp, update} from "../controllers/users.js"
import verifyToken from "../middlewares/auth.js"

const userRouter = Router()

userRouter.post("/signup", signUp)
userRouter.post("/signin", signIn)
userRouter.post("/forgotpassword", requestNewPassword)
userRouter.put("/redefinepassword", redefinePassword)
userRouter.get("/findAll", verifyToken, findAll)
userRouter.get("/findOne", verifyToken, findOne)
userRouter.put("/update/:id", verifyToken, update)
userRouter.delete("/destroy/:id", verifyToken, destroy)

export default userRouter
