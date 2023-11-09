import express from "express"
import cors from "cors"
import router from "./routes/router.js"

const app = express()

app.use(express.json())
app.use(cors({
    "origin": "https://reverse-time-back-end.vercel.app/"
}))
app.use(router)

export default app
