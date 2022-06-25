const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    tittle : {
        type: String,
        required: true
    },
    release_date : {
        type: Date,
        required: true
    },
    overview: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true,
        //default: ""
    },
    trailer_id: {
        type: String,
        require: true
    },
    average_vote: {
        type: Number,
        required: true
    },
    total_voted: {
        type: Number,
        require: true
    },
    categories: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model('Movie', movieSchema)