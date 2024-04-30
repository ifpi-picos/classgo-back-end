import database from "./database.js"
import Class from "../models/classes.js"
import User from "../models/users.js"
import Lesson from "../models/lessons.js"
import Student from "../models/students.js"
import Frequency from "../models/frequencies.js"

const models = database.models

async function associations() {
    await User.associate(models)
    await Class.associate(models)
    await Lesson.associate(models)
    await Student.associate(models)
    await Frequency.associate(models)
}

export default associations
