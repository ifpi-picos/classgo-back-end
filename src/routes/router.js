import classRouter from "./classes.js"
import { Router } from "express"
import userRouter from "./users.js"

const router = Router()

router.use("/users", userRouter)
router.use("/classes", classRouter)

export default router
