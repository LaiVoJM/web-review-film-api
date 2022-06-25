const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        require: true
    }
})

module.exports = mongoose.model('Favorite', favoriteSchema)