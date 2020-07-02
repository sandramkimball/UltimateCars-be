var express = require('express')
var router = express.Router()
var User = require('../models/User')
var restricted = require('../middleware/restricted')
require('dotenv')


// GET A USER
router.get('/:id', restricted, (req, res) => {
    id = req.params.id

    User.findById(id)
    .then(user => {
        res.json(user)
    })
    .catch( err=> {
        res.json({message: 'User not found.', error: err})
    })
})

// EDIT A USER
router.put('/:id', restricted, (req, res) => {
    let updatedUser = req.body
    let id = req.params.id
    
    User.findById(id)
    .update(updatedUser)
    .then(user=> {
        res.json({ status: 201, message: 'Update successful' })
    })
    .catch(err=> {
        res.json({ status: 500, message: err.message})
    })
})

// DELETE A USER
router.delete('/:id', restricted, (req, res) => {
    let id = req.params.id
   
    User.findById(id)
    .where({id})
    .delete()
    .then(()=> {
        res.json({ message: 'Successfully deleted'})
    })
    .catch(err => {
        res.json({ message: err.message, error: err})
    })
})

module.exports = router