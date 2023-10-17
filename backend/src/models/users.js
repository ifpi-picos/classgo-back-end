import { DataTypes } from "sequelize"
import database from "../config/database.js"

const users = database.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        alowNull: false
    },

    email: {
        type: DataTypes.STRING,
        alowNull: false
    },

    password: {
        type: DataTypes.STRING,
        alowNull: false
    }
})

database.sync()

export default users
