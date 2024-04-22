import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Administrator = database.define("Administrator", {
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

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},

    {
        createdAt: false,
        updatedAt: false,
        tableName: "administrators"
    }
)

export default Administrator
