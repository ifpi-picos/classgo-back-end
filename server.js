import app from "./src/app.js"
import associations from "./src/config/associations.js"
import database from "./src/config/database.js"

app.listen(3030, () => console.log("Servidor em execução: https://idcurso-back-end.vercel.app"))

associations()

database.sync({force: true})
