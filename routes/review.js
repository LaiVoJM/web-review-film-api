const router = require('express').Router()
const verify = require('./verifyToken')
const Review = require('../model/Review')
// const User = require('../model/User')
//Create review
router.post('/', verify, async(req, res) => {
    const newReview = new Review(req.body)
    if (newReview.user_id == '') {
        res.status(401).send('Please login to add review')
    }
    else if (newReview.content == '') {
        res.status(404).send('Review can not be empty')
    } else if (newReview.movie_id == '') {
        res.status(402).send('Missing movie id')
    }
    else {
        try {
            const saveReview = await newReview.save()
            res.status(200).send(saveReview)
        } catch (error) {
            res.status(400).send(err)
        }
    }
})

//Get review by movie id
router.get('/:id', async(req, res) => {
    const review = await Review.find({movie_id: req.params.id})
                                .populate('user_id', 'name')
    if (review != null) {
        try {
            res.status(200).send(review)
        } catch (error) {
            res.status(400).send(err)            
        }
    }
    else {
        res.status(404).send('Review not found')
    }
})

//Update review
router.put('/:id', verify, async(req, res) => {
    const updateReview = await Review.findById(req.params.id)
    if (updateReview != null) {
        try {
            const updated = await Review.findByIdAndUpdate({_id: req.params.id}, {$set: req.body, }, {new: true})
            res.status(200).send(updated)
        } catch (error) {
            res.status(400).send(err)            
        }
    }
    else {
        res.status(404).send('Review not found')
    }
})

//Delete review
router.delete('/:id', verify, async(req, res) => {
    const review = await Review.findById(req.params.id)
    if (review != null) {
        try {
            await review.delete()
            res.status(200).send('Review has been deleted')
        } catch (error) {
            res.status(400).send(err)            
        }
    }
    else {
        res.status(404).send('Review not found')
    }
})

module.exports = router