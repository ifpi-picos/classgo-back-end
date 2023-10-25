import { DataTypes } from "sequelize"
import database from "../config/database.js"

const Teacher = database.define("teachers", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(50),
        alowNull: false
    },

    email: {
        type: DataTypes.STRING(50),
        alowNull: false
    },

    password: {
        type: DataTypes.STRING,
        alowNull: false
    }
})

export default Teacher
