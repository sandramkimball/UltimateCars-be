var express = require('express');
var router = express.Router();

var Vehicle = require('../models/Vehicles');
var Location = require('../models/Locations');

// GET ALL
router.get('/', (req, res) => {
    Vehicle.find()
    .then(vehicles => {
        res.json({data: vehicles})
    })
    .catch( err => {
        res.json({message: 'Error retrieving vehicles.', error: err})
    })
})

// GET ONE
router.get('/', (req, res) => {
    Vehicle.findById(req.body.id)
    .then(vehicle => {
        res.json({data: vehicle})
    })
    .catch( err => {
        res.json({message: 'Vehicle not found.', data: err})
    })
})

// POST
router.post('/', (req, res) => {
    // Location
    const address = req.body.street_address
    var location
    // Check if location exists
    if(Location.find(address) === true) {
        Location.find(address)
        .then(result => location = result )
    }
    // Create new location
    else {
        location = new Location({
            street_address: address,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            state: 'Ca'
        })

        location.save()
        .then( location => {
            res.json({ message: 'New address saved.', data: location})
        })
        .catch(err => {
            res.json({ message: 'Error adding address.', error: err})
        })
    }
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

    // Add Vehicle with found/created location
    const newVehicle = new Vehicle({
        title: req.body.title,
        content: req.body.content,
        location: address.id,
        images: image.id
    })
    
    newVehicle.save()
    .then( vehicle => {
        res.json({ message: 'Vehicle saved.', data: vehicle })
    })
    .catch( err => {
        res.json({ message: 'Error creating vehicle.', error: err })
    })
})

// PUT
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

// DELETE
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