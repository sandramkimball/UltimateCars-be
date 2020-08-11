var express = require('express');
var router = express.Router();
var dataExtractor = require('../dataExtractor')

var Vehicle = require('../models/Vehicles');


// GET CAR STATISTICS
router.get('/', (req, res) => {
    Vehicle.find().then( cars => {
        res.json({ message: 'CAR STATS', data:  dataExtractor( cars ) })
    })
    .catch(()=> {
        res.json({message:'boo'})
    })
})

module.exports = router;