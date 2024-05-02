import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Student = database.define("student", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    numberOfPresences: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "classes"}
    }
},
    {
        timestamps: false
    }
)

export default Student
