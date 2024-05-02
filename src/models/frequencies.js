import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Frequency = database.define("frequency", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    studentName: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    presence: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "lessons"}
    }
}, 
    {
        timestamps: false
    }
)

export default Frequency
