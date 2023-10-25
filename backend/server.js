import app from "./src/app.js"
import dotenv from "dotenv"

dotenv.config()

const API_URL = process.env.API_URL
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server Running on: ${API_URL}`))
