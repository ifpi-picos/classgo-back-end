import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Register = database.define("Register", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "classes", key: "id"}
    },

    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "lessons", key: "id"}
    },

    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "students", key: "id"}
    },
}, 

    {
        tableName: "registers"
    }
)

export default Register
