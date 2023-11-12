import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Course = database.define("Course", {
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

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "users", key: "id"}
    }
}, 

    {
        tableName: "courses"
    }
)

export default Course
