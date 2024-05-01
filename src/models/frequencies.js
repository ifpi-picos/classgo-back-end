import database from "../config/database.js"
import { DataTypes } from "sequelize"

const Frequency = database.define("frequency", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    studentName: {
        type: DataTypes.TEXT,
        allowNull: false
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
}

export default Frequency
