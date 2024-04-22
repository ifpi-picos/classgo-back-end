import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Frequency = database.define("Frequency", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    studentId: {
        type: DataTypes.INTEGER,
        allowNull: null,
        references: {model: "students"}
    },

    presence: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "lessons"}
    }
}, 

    {
        createdAt: false,
        updatedAt: false,
        tableName: "frequencies"
    }
)

export default Frequency
