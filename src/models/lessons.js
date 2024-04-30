import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Lesson = database.define("lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},
    {
        timestamps: false
    }
)

Lesson.associate = async (models) => {
    await Lesson.belongsTo(models.class, {as: "class", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
    await Lesson.hasMany(models.frequency, {as: "frequency", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
}

export default Lesson
