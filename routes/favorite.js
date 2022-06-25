const router = require('express').Router()
const verify = require('./verifyToken')
const Favorite = require('../model/Favorite')

//Get favorite by user id
router.get('/:id', verify, async(req, res) => {
    const favorite = await Favorite.find({user_id: req.params.id})
                                    .populate('movie_id')
    if (favorite != '') {
        try {
            res.status(200).send(favorite)
        } catch (error) {
            res.status(400).send(err)            
        }
    }
    else {
        res.status(404).send('Do not have favorie movie')
    }
})


//Add to favorite
router.post('/', verify, async(req, res) => {
    const check = await Favorite.findOne({movie_id: req.body.movie_id})
    if (check) return res.status(401).send('Existed in list')
    const newFavorite = new Favorite(req.body)
    if(newFavorite.user_id == '') {
        res.status(404).send('Please login to add to your favorites')
    }
    else if(newFavorite.movie_id == '') {
        res.status(402).send('No movie to add')
    } 
    else {
        try {
            const saveFavorite = await newFavorite.save()
            res.status(200).send(saveFavorite)
        } catch (error) {
            res.status(400).send(err)
        }
    }
})

//Delete favorite 
router.delete('/:id', verify, async(req, res) => {
    const favorite = await Favorite.findOne({movie_id: req.params.id})
    if (favorite != null) {
        try {
            await favorite.delete()
            res.status(200).send('Delete successful')
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
    else {
        res.status(404).send('Favorite not found')
    }
})


module.exports = router
