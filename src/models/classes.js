import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Class = database.define("class", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    numberOfStudents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    numberOfLessons: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "users"}
    }
},
    {
        timestamps: false
    }
)

export default Class
