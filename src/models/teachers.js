import { DataTypes } from "sequelize"
import database from "../config/database.js"

const Teacher = database.define("Teacher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},

    {
        createdAt: false,
        updatedAt: false,
        tableName: "teachers"
    }
)


export default Teacher
