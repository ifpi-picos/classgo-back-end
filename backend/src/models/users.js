import database from "../config/database.js"
import { DataTypes } from "sequelize"

const User = database.define("User", {
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

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {notEmpty: true}
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    }
}, 

    {
        tableName: "users"
    }
)

//database.sync()

export default User
