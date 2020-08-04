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
// SKIPS TO END RESULT
router.post('/register', (req, res) => {
    // Create newUser
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        state: req.body.state,
    })

    newUser.save()
    .then( saved => {
        res.json({ message: `Welcome to the team, ${newUser.firstName}.`, data: saved })
    })
    .catch( err => {
        res.json({ message: `Failed to add ${newUser.firstName} because you\'re a shitty driver.`, data: req.body, error: err})
    })
})

//  CANT FIND PATHS
router.post('/registration', (req, res) => {
    if(req.body.firstName === undefined){
        return res.json({ message: 'WE GOT A NO NAME!', data: req.body})
    } 

    else { 
        // Create newUser
        const newUser = new User({
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
            res.json({ message: `Welcome to the team, ${newUser.firstName}.`, data: saved })
        })
        .catch( err => {
            res.json({ message: `Failed to save ${newUser.firstName} because you\'re mother drives a lemon.`, error: err})
        })  
    }
})


module.exports = router;