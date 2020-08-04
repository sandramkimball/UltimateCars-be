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
    } catch(err){
        res.json({ message: `You don\'t really exist, ${req.body.firstName}.`, error: err})
    }

    try{
        User.add(newUser)
        .then( saved => {
            res.json({ message: `Welcome to the team, ${newUser.firstName}.`, data: saved })
        })
        .catch( err => {
            res.json({ message: `Failed to add ${req.body.firstName} because you\'re a shitty driver.`, error: err})
        })
    }
    catch (err){
        res.json({ message: 'I don\'t even know.', error: err})
    }
})

//  CANT FIND PATHS
router.post('/registration', (req, res) => {
        // Create newUser
        const newUser =  new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
        })

        if(req.body.firstName === null){
            return res.json({ message: 'WE GOT A NO NAME!'})
        }
        
        if(newUser.firstName === null){
            return res.json({ message: 'NO NEW USER!'})
        }

    try{
        // Save newUser
        newUser.save()
        .then( saved => {
            res.json({ message: `Welcome to the team, ${newUser.firstName}.`, data: saved })
        })
        .catch( err => {
            res.json({ message: `Failed to save ${newUser.firstName} because you\'re mother drives a lemon.`, error: err})
        })  
    } catch (err){
        res.json({ message: 'Obviously issue finding the driver.', error: err})
    }
})


module.exports = router;