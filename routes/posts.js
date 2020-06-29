var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

// GET

// all posts
router.get('/', (req, res) => {
    Post.find()
    .then(posts => {
        res.json({data: posts})
    })
})

// one post
router.get('/', (req, res) => {})

// POST
router.post('/', (req, res) => {})

// PUT
router.put('/', (req, res) => {})

// DELETE
router.delete('/', (req, res) => {})