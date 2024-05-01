import classRouter from "./classes.js"
import frequencyRouter from "./frequencies.js"
import lessonRouter from "./lessons.js"
import { Router } from "express"
import studentRouter from "./students.js"
import userRouter from "./users.js"

const router = Router()

router.use("/users", userRouter)
router.use("/classes", classRouter)
router.use("/lessons", lessonRouter)
router.use("/frequencies", frequencyRouter)
router.use("/students", studentRouter)

export default router
