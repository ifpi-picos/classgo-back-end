import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Class = database.define("class", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    numberOfStudents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        timestamps: false
    }
)

Class.associate = async (models) => {
    await Class.belongsTo(models.user, {as: "user", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
    await Class.hasMany(models.lesson, {as: "lesson", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
    await Class.hasMany(models.student, {as: "student", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
}

export default Class
