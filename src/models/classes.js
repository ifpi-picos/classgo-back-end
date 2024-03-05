import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Class = database.define("Class", {
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

    studentsCapacity: {
        type: DataTypes.INTEGER,
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
        tableName: "classes"
    }
)

export default Class
