import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Lesson = database.define("lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
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

export default Lesson
