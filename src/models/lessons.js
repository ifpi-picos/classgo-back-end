import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Lesson = database.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATEONLY,
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
        tableName: "lessons"
    }
)

export default Lesson
