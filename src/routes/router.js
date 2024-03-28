import { Router } from "express"
import classRouter from "./classes.js"
import frequencyRouter from "./frequencies.js"
import lessonRouter from "./lessons.js"
import studentRouter from "./students.js"
import userRouter from "./users.js"

const router = Router()

router.use("/classes", classRouter)
router.use("/frequencies", frequencyRouter)
router.use("/lessons", lessonRouter)
router.use("/students", studentRouter)
router.use("/users", userRouter)

export default router
