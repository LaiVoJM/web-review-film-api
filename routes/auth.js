const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../vaidation')

//Register
router.post('/register', async (req, res) => {
    //Validate the data
    const {error} =registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check email exists
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(401).send('Email already existed!')

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })  

    //Create token
    // const token = jwt.sign(
    //     {_id: user._id}, process.env.TOKEN_SECRET,
    //     {
    //         expiresIn: "2h"
    //     }
    // )
    // user.token = token
    //const token = await user.generateAuthToken()

    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (error) {
        res.status(500).send(error)
    }  
    
})

//Login
router.post('/login', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.body.email == '' || req.body.password == '')
    return res.status(400).send('Missing email or password')
    
    const {error} = loginValidation(req.body)
    if(error) return res.status(500).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(401).send('Unauthorized!')

    const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if(!passwordCheck) return res.status(404).send('Incorrect password!')

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,
    {
        expiresIn: "2h"
    })
    res.header('auth-token', token).send({user: user._id, token, name: user.name, role: user.role})
    // const token = await user.generateAuthToken()
    // res.send({ user, token })
})

//Logout
// router.post('/logout', auth, async(req, res) => {
//    try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send('Logout successful')
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })


module.exports = router

//