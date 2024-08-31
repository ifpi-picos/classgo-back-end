import app from "./src/app.js"
import database from "./src/config/database.js"

database.sync({alter: true}).then(() => app.listen(3030, () => console.log("Servidor em execução: https://classgo-back-end.vercel.app")))
