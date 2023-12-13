import database from "../config/database.js"
import { DataTypes } from "sequelize"

export const User = database.define("User", {
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

export const Class = database.define("Class", {
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

    totalLessons: {
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

export const Lesson = database.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncremnet: true,
        primaryKey: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {notEmpty: true}
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "classes", key: "id"}
    }
},

    {
        tableName: "lessons"
    }
)

export const Student = database.define("Student", {
    id: {
        type: DataTypes.INTEGER,
        autoIncremnet: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },

    numberAbsences: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true}
    },

    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {notEmpty: true},
        references: {model: "classes", key: "id"}
    }
},

    {
        tableName: "students"
    }
)
