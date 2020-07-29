var express = require('express');
var router = express.Router();

var Vehicle = require('../models/Vehicles');

// GET ALL CARS
router.get('/', (req, res) => {
    Vehicle.find()
    .then(vehicles => {
        res.json({data: vehicles})
    })
    .catch( err => {
        res.json({message: 'Error retrieving vehicles.', error: err})
    })
})

// GET ONE CAR
router.get('/:id', (req, res) => {
    Vehicle.findById(req.body._id)
    .then(vehicle => {
        res.json({data: vehicle})
    })
    .catch( err => {
        res.json({message: 'Vehicle not found.', data: err})
    })
})

// POST A NEW CAR
router.post('/', (req, res) => {
    // Add Image
    var image = new Image
    image.img.data = fs.readFileSync(imgPath);
    image.img.contentType = 'image/jpg'
    image.save()
    .then( () => {
        res.json({ message: 'Image saved.' })
    })
    .catch( err => {
        res.json({ message: err.message, error: err })
    })

    // Add Vehicle 
    let newVehicle = req.body
    
    Vehicle.add(newVehicle)
    .then( vehicle => {
        res.json({ message: 'Vehicle saved.', data: vehicle })
    })
    .catch( err => {
        res.json({ message: 'Error creating vehicle.', error: err })
    })
})

// PUT UPDATE A CAR
router.put('/:id', (req, res) => {
    var id = req.params.id
    Vehicle.findByIdAndUpdate({ id })
    .then( vehicle => {
        res.json({ message: 'Vehicle updated', data: vehicle })
    })
    .catch( err => {
        res.json({ message: 'Unable to update.', error: err })
    })
})

// DELETE A CAR
router.delete('/:id', (req, res) => {
    var id = req.params.id
    Vehicle.findByIdAndDelete({ id })
    .then( () => {
        res.json({ message: 'Vehicle deleted.' })
    })
    .catch ( err => {
        res.json({ message: 'Error deleting vehicle.', error: err })
    })
})

module.exports = router;