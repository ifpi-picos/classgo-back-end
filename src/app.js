import classRouter from "./routes/classes.js"
import cors from "cors"
import express from "express"
import frequencyRouter from "./routes/frequencies.js"
import lessonRouter from "./routes/lessons.js"
import studentRouter from "./routes/students.js"
import userRouter from "./routes/users.js"

const router = express.Router()

router.use("/users", userRouter)
router.use("/classes", classRouter)
router.use("/lessons", lessonRouter)
router.use("/frequencies", frequencyRouter)
router.use("/students", studentRouter)

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

export default app
