const router = require('express').Router()
const verify = require('./verifyToken')
const Movie = require('../model/Movie')

//select top 4 newest
router.get('/top4', async(req, res) => {
    const movies = await Movie.find().sort({$natural:-1}).limit(4)
    if(movies != '') {
        try {
            res.status(200).send(movies)
        } catch (error) {
            res.status(400).send(err)
        }
    }
    else {
        res.status(404).send('Movie not found')
    }
})





module.exports = router