import { Router } from "express"
import authRouter from "./auth.js"
import courseRouter from "./courses.js"

const router = Router()

router.use("/", authRouter)
router.use("/courses", courseRouter)

export default router
