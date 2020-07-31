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

// LOGIN - GET A USER
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    
    if(!email || !password){
        return res.json({status: 401, message: 'Missing email or password.'})
    }

    User.findBy({ email })
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = getJwtToken(user);
            res.json({status: 200, token, user})
        } else {
            res.json({ status: 404, message: 'Email or password is incorrect.'})
        }
    })
    .catch( err=> {
        res.json({message: 'User not found.', error: err})
    })
})

// REGISTER -A NEW USER
router.post('/register', (req, res) => {
    let newUser = req.body

    // grab and hash password
    const hash = bcrypt.hashSync(newUser.password, 10)
    newUser.password = hash

    User.add(newUser)
    .then( saved => {
        res.json({ message: 'New user created.', data: saved })
    })
    .catch( err => {
        res.json({ message: 'Failed to create user.', error: err})
    })
})

router.post('/registration', (req, res) => {
    // Grab and hash password
    const hash = bcrypt.hashSync(req.body.password, 10)
    newUser.password = hash

    // Create new user object.
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        city: req.body.city,
        state: req.body.state,

    })

    newUser.save()
    .then( saved => {
        res.json({ message: 'New user created.', data: saved })
    })
    .catch( err => {
        res.json({ message: 'Failed to create user.', error: err})
    })
})


module.exports = router;