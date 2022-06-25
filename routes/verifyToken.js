const jwt = require('jsonwebtoken')
// const User = require('../model/User')

module.exports = function (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '')
    if(!token) return res.status(401).send('Access denied!')
    //const data = jwt.verify(bearerHeader, process.env.TOKEN_SECRET)
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET,
        {
            expiresIn: "2h"
        })
        req.user = verify
        // const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        // if (!user) {
        //     throw new Error()
        // }
        // req.user = user
        // req.token = bearerHeader
        next()
    } catch (error) {
        res.status(403).send('Invalid token')
    }
} 
