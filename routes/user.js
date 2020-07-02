var express = require('express')
var router = express.Router()

var User = require('../models/User')

// GET A USER
router.get('/', (req, res) => {
    User.findById(req.body.id)
    .then(user => {
        res.json({data:user})
    })
    .catch( err=> {
        res.json({message: err.message, error:err})
    })
})

// POST A NEW USER

// EDIT A USER

// DELETE A USER