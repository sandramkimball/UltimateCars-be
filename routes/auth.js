var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var User = require('../models/User')
require('dotenv')

function getJwtToken(user){
    const payload = { 
        email: user.email,
        subject: user.id, //sub in payload is what token is about
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        state: user.state
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

    User.find({ email: req.body.email })
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = getJwtToken(user);
            res.json({status: 200, message: `Welcome back ${user.firstName}`, data: {token, user} })
        } else {
            res.json({ status: 404, message: 'Email or password is incorrect.'})
        }
    })
    .catch( err=> {
        res.json({message: 'User not found.', error: err})
    })
})

// REGISTER NEW USER
router.post('/register', async (req, res) => {
    try{
        // Create newUser
        const newUser =  new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
        })

        User.add(newUser)
        .then( saved => {
            res.json({ message: 'New user added.', data: saved })
        })
        .catch( err => {
            res.json({ message: 'Failed to add new user.', error: err})
        })
    }
    catch (err){
        res.json({ message: 'I don\'t even know.', error: err})
    }
})

router.post('/registration', async (req, res) => {
    try{
        // Create newUser
        const newUser =  new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
        })

        // Save newUser
        newUser.save()
        .then( saved => {
            res.json({ message: 'New user saved.', data: saved })
        })
        .catch( err => {
            res.json({ message: 'Failed to save user.', error: err})
        })  
    } catch (err){
        res.json({ message: 'I don\'t even know.', error: err})
    }
})


module.exports = router;