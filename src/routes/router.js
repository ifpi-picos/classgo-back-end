import classRouter from "./classes.js"
import { Router } from "express"
import userRouter from "./users.js"

const router = Router()

export default router

router.use("/users", userRouter)
router.use("/classes", classRouter)
