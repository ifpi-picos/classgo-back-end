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
        validate: {notEmpty: true}
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {notEmpty: true}
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "classes", key: "id"}
    }
},

    {
        tableName: "lessons"
    }
)

export default Lesson
