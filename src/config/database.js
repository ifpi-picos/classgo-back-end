import dotenv from "dotenv"
import Sequelize from "sequelize"
import postgres from "pg"

dotenv.config()

const dbName = process.env.DATABASE_NAME
const dbUser = process.env.DATABASE_USER
const dbPassword = process.env.DATABASE_PASSWORD
const host = process.env.HOST
const port = process.env.PORT

const database = new Sequelize(dbName, dbUser, dbPassword, {
    host: host,
    dialect: "postgres",
    dialectModule: postgres,
    port: port
})

database
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!")
    })
    .catch(err => {
        console.error("Erro:", err)
    })

export default database
