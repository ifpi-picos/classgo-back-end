import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Class = database.define("Class", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    numberOfStudents: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "users"}
    }
},

    {
        createdAt: false,
        updatedAt: false,
        tableName: "classes"
    }
)

export default Class
