import { config } from "dotenv"
import Sequelize from "sequelize"
import postgres from "pg"

config()

const dbConfig = {
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST
}

const database = new Sequelize(dbConfig, {dialect: "postgres", dialectModule: postgres})

database.authenticate().then(() => console.log("Conexão realizada com sucesso!")).catch((err) => console.log(err.message))

export default database
