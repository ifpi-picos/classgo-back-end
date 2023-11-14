import { Router } from "express"
import authRouter from "./auth.js"
import courseRouter from "./courses.js"
import forgotPasswordRouter from "./forgotPassword.js"
import redefinePasswordRouter from "./redefinePassword.js"

const router = Router()

router.use("/", authRouter)
router.use("/courses", courseRouter)
router.use("/forgotpassword", forgotPasswordRouter)
router.use("/redefinepassword", redefinePasswordRouter)

export default router
