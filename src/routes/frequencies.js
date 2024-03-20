import { Router } from "express"
import { create } from "../controllers/frequencies.js"
import verifyToken from "../middlewares/auth.js"

const frequencyRouter = Router()

frequencyRouter.use("/create", verifyToken, create)

export default frequencyRouter
