var express = require('express');
var router = express.Router();

var Post = require('../models/Posts');
var Location = require('../models/Locations');

// GET ALL
router.get('/', (req, res) => {
    Post.find()
    .then(posts => {
        res.json({data: posts})
    })
    .catch( err => {
        res.json({message: 'Error retrieving posts.', error: err})
    })
})

// GET ONE
router.get('/', (req, res) => {
    Post.findById(req.body.id)
    .then(post => {
        res.json({data: post})
    })
    .catch( err => {
        res.json({message: 'Post not found.', data: err})
    })
})

// POST
router.post('/', (req, res) => {
    // Location
    const address = req.body.street_address
    var location
    // Check if location exists
    if(Location.find(address) === true) {
        Location.find(address)
        .then(result => location = result )
    }
    // Create new location
    else {
        location = new Location({
            street_address: address,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            state: 'Ca'
        })

        location.save()
        .then( location => {
            res.json({ message: 'New address saved.', data: location})
        })
        .catch(err => {
            res.json({ message: 'Error adding address.', error: err})
        })
    }

    // Add Post with found/created location
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        location: address.id
    })
    newPost.save()
    .then( post => {
        res.json({ message: 'Post saved.', data: post })
    })
    .catch( err => {
        res.json({ message: 'Error creating post.', error: err })
    })
})

// PUT
router.put('/:id', (req, res) => {
    var id = req.params.id
    Post.findByIdAndUpdate({ id })
    .then( post => {
        res.json({ message: 'Post updated', data: post })
    })
    .catch( err => {
        res.json({ message: 'Unable to update.', error: err })
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    var id = req.params.id
    Post.findByIdAndDelete({ id })
    .then( () => {
        res.json({ message: 'Post deleted.' })
    })
    .catch ( err => {
        res.json({ message: 'Error deleting post.', error: err })
    })
})

module.exports = router