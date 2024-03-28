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
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "students", key: "id"}
    },

    presence: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {notEmpty: true}
    },

    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "lessons", key: "id"}
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "classes", key: "id"}
    }
}, 

    {
        tableName: "frequencies"
    }
)

export default Frequency
