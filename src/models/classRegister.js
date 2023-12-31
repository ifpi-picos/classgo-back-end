import database from "../config/database.js"
import { DataTypes } from "sequelize"

const ClassRegister = database.define("ClassRegister", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "classes", key: "id"}
    }
}, 

{
    tableName: "class_register"
})

export default ClassRegister
