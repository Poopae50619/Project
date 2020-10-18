const { Bookborrow } = require('../models')
module.exports = {
    // get all Bookborrow
    async index(req, res) {
        try {
            const users = await Bookborrow.findAll()
            res.send(users)
        } catch (err) {
            res.status(500).send({
                error: 'The users information was incorrect'
            })
        }
    },
    // create Bookborrow
    async create(req, res) {
        try {
            const Bookborrow = await Bookborrow.create(req.body)
            res.send(Bookborrow.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Bookborrow already in system'
            })
        }
    },
    // edit Bookborrow, suspend, active
    async put(req, res) {
        try {
            await Bookborrow.update(req.body, {
                where: {
                    id: req.params.userId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Bookborrow incorrect'
            })
        }
    },
    // delete Bookborrow
    async remove(req, res) {
        try {
            const Bookborrow = await Bookborrow.findOne({
                where: {
                    id: req.params.userId
                }
            })
            if (!Bookborrow) {
                return res.status(403).send({
                    error: 'The Bookborrow information was incorrect'
                })
            }
            await Bookborrow.destroy()
            res.send(Bookborrow)
        } catch (err) {
            res.status(500).send({
                error: 'The Bookborrow information was incorrect'
            })
        }
    },
    // get Bookborrow by id
    async show(req, res) {
        try {
            const Bookborrow = await Bookborrow.findById(req.params.userId)
            res.send(Bookborrow)
        } catch (err) {
            req.status(500).send({
                error: 'The Bookborrow information was incorrect'
            })
        }
    },
    async getFront(req, res) {
        try {
            const users = await Bookborrow.findAll()
            let listNames = []
            users.forEach(Bookborrowuser => {
                let name = {
                    "id": Bookborrow.id,
                    "name": `${Bookborrow.name} ${Bookborrow.lastname}`
                }
                listNames.push(name)
            })
            res.send(listNames)
        } catch (err) {
            res.status(500).send({
                error: 'The Bookborrow information was incorrect'
            })
        }
    },
}