import Sequelize from "sequelize"
import { dbConfig } from "./dotenv.js"

const database = new Sequelize(dbConfig)

//database.authenticate().then(() => database.sync({force: true})).catch((err) => console.log(err.message))

export default database
