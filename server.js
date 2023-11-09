import app from "./src/app.js"
import dotenv from "dotenv"
import database from "./src/config/database.js"

dotenv.config()

const API_URL = process.env.API_URL
const PORT = process.env.PORT

//database.sync()

app.listen(PORT, () => console.log(`Server Running on: ${API_URL}`))
