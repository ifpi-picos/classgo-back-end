import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Progress = database.define("Progress", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "students"}
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
        tableName: "progresses"
    }
)


export default Progress
