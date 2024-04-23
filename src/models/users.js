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
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},

    {
        createdAt: false,
        updatedAt: false,
        tableName: "users"
    }
)


export default User
