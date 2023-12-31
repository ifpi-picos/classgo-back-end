import { Router } from "express"
import authRouter from "./auth.js"
import classRouter from "./classes.js"
import lessonRouter from "./lessons.js"
import forgotPasswordRouter from "./forgotPassword.js"
import redefinePasswordRouter from "./redefinePassword.js"
import studentRouter from "./students.js"
import userRouter from "./users.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/classes", classRouter)
router.use("/forgotpassword", forgotPasswordRouter)
router.use("/lessons", lessonRouter)
router.use("/redefinepassword", redefinePasswordRouter)
router.use("/students", studentRouter)
router.use("/users", userRouter)

export default router
