import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Lesson = database.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncremnet: true,
        primaryKey: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {notEmpty: true}
    },

    description: {
        type: DataTypes.STRING,
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
