import { Router } from "express"
import authRouter from "./auth.js"
import classRouter from "./classes.js"
import forgotPasswordRouter from "./forgotPassword.js"
import redefinePasswordRouter from "./redefinePassword.js"
import verifyToken from "../middlewares/auth.js"

const router = Router()

router.use("/", authRouter)
router.use("/classes", verifyToken, classRouter)
router.use("/forgotpassword", forgotPasswordRouter)
router.use("/redefinepassword", verifyToken, redefinePasswordRouter)

export default router
