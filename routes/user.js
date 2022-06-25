const router = require('express').Router()
const User = require('../model/User')
const verify = require('./verifyToken')
const bcrypt = require('bcryptjs')

//Get all user
router.get('/', verify, async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).send(user)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

//Get user
router.get('/:id', verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).send(others)
    } catch(err) {
        res.status(500).send(err)
    }
})

//Update user
router.put('/:id', verify, async(req, res) => {
    if(req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body, }, {new: true})
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router


