import Class from "../models/classes.js"

export const create = async (req, res) => {
    const userId = req.userId
    const {description, totalLessons} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo nome da turma obrigatório!")
        }

        else if (!totalLessons) {
            return res.status(400).send("Campo total de aulas obrigatório!")
        }

        const dbClasse = await Class.findOne({where: {description: description, userId: userId}})

        if (dbClasse) {
            return res.status(400).send("Turma já criada!")
        }
    
        await Class.create({description, totalLessons, userId})
    
        return res.status(201).send("Turma criada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findOne = async (req, res) => {
    const id = req.params.id

    const myClass = await Class.findOne({where: {id: id}})

    return res.status(200).send(myClass)
}

export const findAll = async (req, res) => {
    const userId = req.userId

    const myClasses = await Class.findAll({where: {userId: userId}})

    return res.status(200).send(myClasses)
}

export const update = async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    const {description, totalLessons} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo nome da turma obrigatório")
        }

        else if (!description) {
            return res.status(400).send("Campo total de aulas obrigatório")
        }

        const dbClasse = await Class.findOne({where: {description: description, userId: userId}})

        if (dbClasse) {
            return res.status(400).send("Turma já criada!")
        }
    
        await Class.update({description: description, totalLessons: totalLessons}, {where: {id: id}})
    
        return res.status(200).send("Turma editada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const destroy = async (req, res) => {
    const id = req.params.id

    try {
        await Class.destroy({where: {id: id}})
    
        return res.status(200).send("Turma excluida com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
