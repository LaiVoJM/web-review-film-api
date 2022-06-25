const router = require('express').Router()
const verify = require('./verifyToken')
const Movie = require('../model/Movie')
const Favorite = require('../model/Favorite')
//Create movie
router.post('/', verify, async(req, res) => {
    const newMovie = new Movie(req.body)
    try {
        const saveMovie = await newMovie.save()
        res.status(200).send(saveMovie)
    } catch (error) {
        res.status(400).send(err)
    }
})

//Get movie by id
router.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (movie != null) {
        try {
            res.status(200).send(movie)
        } catch (error) {
            res.status(400).send(err)
        }
    }
    else {
        res.status(404).send('Movie not found')
    }
})

//Get all movies or get movies by categories
router.get('/', async(req, res) => {
    const catName = req.query.cat
    
        if(catName) {
            const movies = await Movie.find({
                categories: {
                    $in: [catName]
                }
            }).sort({$natural:-1})
            if(movies != '') {
                try {
                    res.status(200).send(movies)
                } catch (error) {
                    res.status(400).send(err)
                }
            } else {
                res.status(404).send('Movie not found')
            }
        }
        else {
            const movies = await Movie.find().sort({$natural:-1})
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
        }
})

//Update movie
router.put('/:id', verify, async(req, res) => {
    const updateMovie = await Movie.findById(req.params.id)
    if (updateMovie != null) {
        try {
            const updated = await Movie.findByIdAndUpdate({_id: req.params.id}, {$set: req.body, }, {new: true})
            res.status(200).send(updated)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    else {
        res.status(404).send('Movie not found!')
    }
})

//Delete movie
router.delete('/:id', verify, async(req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (movie != null) {
        try {
            await movie.delete()
            res.status(200).send('Movie has been deleted')                
        } catch (error) {
            res.status(400).send(error)
        }
    }
    else {
        res.status(404).send('Movie not found!')
    }
    
})



//Search movie
router.post('/search/:text', async(req, res) => {
    const text = req.params.text
    try {
        const movie = await Movie.find({tittle: {'$regex' : `${text}`, '$options' : 'i'}})
        res.status(200).send(movie)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Sort by date
// router.get('/:id', async(req, res) => {
//     const movie = await Movie.findById(req.params.id)
//     if (movie != null) {
//         try {
//             res.status(200).send(movie)
//         } catch (error) {
//             res.status(400).send(err)
//         }
//     }
//     else {
//         res.status(404).send('Movie not found')
//     }
// })

module.exports = router
