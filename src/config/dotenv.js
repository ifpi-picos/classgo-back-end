import { config } from "dotenv"

config()

export const APP_PASSWORD = process.env.APP_PASSWORD
export const JWT_SECRET = process.env.APP_PASSWORD

export const dbConfig = {
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "postgres"
}
