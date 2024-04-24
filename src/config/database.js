import Sequelize from "sequelize"
import { dbConfig } from "./dotenv.js"

const database = new Sequelize(dbConfig)

database.authenticate().then(() => console.log("Conexão realizada com sucesso!")).catch((err) => console.log(err.message))

export default database
