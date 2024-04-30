import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Student = database.define("student", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    numberOfPresences: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        timestamps: false
    }
)

Student.associate = async (models) => {
    await Student.belongsTo(models.class, {as: "class", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
    await Student.hasMany(models.frequency, {as: "frequency", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
}

export default Student
