const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6
    },
    avatar: {
        type: String,
        default: "https://drive.google.com/uc?export=view&id=1aWyBc77-oo6VGZ2D_P472iJdDPGalg6n",
    },
    role: {
        type: Number,
        require: true,
        default: 1
    }
    
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
},
    {timestamps: true})

// userSchema.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,
//     {
//        expiresIn: "24h"
//     })
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }

module.exports = mongoose.model('User', userSchema)



