import Sequelize from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const dbName = process.env.DATABASE_NAME
const dbUser = process.env.DATABASE_USER
const dbPassword = process.env.DATABASE_PASSWORD
const host = process.env.HOST

const database = new Sequelize(dbName, dbUser, dbPassword, {host: host, dialect: "mysql"})

export default database
