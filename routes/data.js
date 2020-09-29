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

// Query DB for car count
router.get('/', (req, res) => {
    // SELECT COUNT(*) FROM vehicles WHERE model == ${req.params.model}
    // /vehicles?q={"model":{"$gt": model}}&h={"$aggregate":["COUNT:"]}
    Vehicle.find().then( models => {
        res.json({ message: 'Model Inventory', data: models })
    })
    .catch(()=> {
        res.json({message:'boo'})
    })
})

module.exports = router;