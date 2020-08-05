var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var User = require('../models/User')
require('dotenv')

function getJwtToken(user){
    const payload = { 
        subject: user.id, //sub in payload is what token is about
        firstName: user.firstName,
    };
    const secret = process.env.SECRET
    const options = { expiresIn: '2d' }

    return jwt.sign(payload, secret, options)
}


// LOGIN - GET USER
router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    if(email === null || password === null){
        return res.json({status: 401, message: 'Missing email or password.'})
    }

    User
    .findOne({ email: req.body.email })
    .then(user => {
        if (user && user.validatePassword(password, user._password)){
            const token = getJwtToken(user);
            res.json({status: 200, message: `Welcome back ${user.firstName}`, data: {token, user} })
        } else {
            res.json({ status: 404, message: 'Password is incorrect.'})
        }
    })
    .catch( err=> {
        res.json({message: 'Email doesn\'t exist.', error: err})
    })
})

// REGISTER NEW USER
router.post('/register', async (req, res) => {
    var doesEmailExist = await User.findOne({ email: req.body.email }).exec()
    
    if(doesEmailExist){
        res.json({ message: "There is already a user with that email."})
        return 
    }

    // Create new user object:
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        _password: req.body.password,
        city: req.body.city,
        state: req.body.state,
    })

    // Save new user:
    newUser.save()
    .then( (newUser)  => {
        res.json({ message: `Welcome to the team, ${newUser.firstName}.`, data: newUser })
    })
    .catch( err => {
        res.json({ message: `You\'re mother drives a lemon.`, error: err})
    })
})

// UPDATE USER
router.put(':id', (req, res) => {
    var updates = req.body
    User.findByIdAndUpdate( req.params.id, updates )
    .then( user => {
        res.json({ message: 'User updated.', data: user })
    })
    .catch( err => res.json({error: err}))
})

// DELETE USER
router.delete('/:id', (req, res) => {
    User.remove({_id: req.params.id})
    .then( ()=> res.json({ message: 'User deleted.'}) )
    .catch( err => res.json({ error: err }) )
})


module.exports = router;