var express = require('express');
var router = express.Router();

var Vehicle = require('../models/Vehicles');
var Location = require('../models/Locations');

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
router.get('/', (req, res) => {
    Vehicle.findById(req.body.id)
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
    const newVehicle = new Vehicle({
        title: req.body.title,
        content: req.body.content,
        location: address.id,
        images: image.id // need to modify to take in a "gallery" of images, not just one
    })
    
    newVehicle.save()
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

module.exports = router