import app from "./src/app.js"

const API_URL = process.env.API_URL

app.listen(3030, () => console.log(`Servidor em execução: ${API_URL}`))
