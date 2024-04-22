import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Student = database.define("Student", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    numberOfPresences: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "classes"}
    }
},

    {
        createdAt: false,
        updatedAt: false,
        tableName: "students"
    }
)


export default Student
