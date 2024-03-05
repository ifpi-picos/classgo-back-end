import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Student = database.define("Student", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },

    absencesNumber: {
        type: DataTypes.INTEGER,
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
        tableName: "students"
    }
)

export default Student
