import { Router } from "express"
import authRouter from "./auth.js"
import classRouter from "./classes.js"
import forgotPasswordRouter from "./forgotPassword.js"
import redefinePasswordRouter from "./redefinePassword.js"
import userRouter from "./users.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/classes", classRouter)
router.use("/forgotpassword", forgotPasswordRouter)
router.use("/redefinepassword", redefinePasswordRouter)

export default router
