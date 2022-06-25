const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        require: true
    },
    // star: {
    //     type: mongoose.Types.Decimal128,
    //     default: 5
    // },

    },
    {timestamps: true}
)
module.exports = mongoose.model('Review', reviewSchema)