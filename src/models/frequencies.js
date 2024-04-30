import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Frequency = database.define("frequency", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    presence: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, 
    {
        timestamps: false
    }
)

Frequency.associate = async (models) => {
    await Frequency.belongsTo(models.lesson, {as: "lesson", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
    await Frequency.belongsTo(models.student, {as: "student", foreignKey: {type: DataTypes.INTEGER, allowNull: false}})
}

export default Frequency
