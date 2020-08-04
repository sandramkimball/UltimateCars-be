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

// GET CAR BY ID
router.get('/:id', (req, res) => {
    Vehicle.find({id: req.body._id})
    .then(vehicle => {
        res.json({data: vehicle})
    })
    .catch( err => {
        res.json({message: 'Vehicle not found.', data: err})
    })
})

// POST A NEW CAR
router.post('/', (req, res) => {
    // Create new vehicle object:
    const newCar = new Vehicle({
        make: req.body.make,
        model: req.body.model,
        body: req.body.body,
        drive: req.body.drive,
        newCar: req.body.isNew,
        engine: req.body.engine,
        transmission: req.body.transmission,
        fuel: req.body.fuel,
        color: req.body.color,
        year: req.body.year,
        miles: req.body.miles,
        price: req.body.price,
        vin: req.body.vin,
        description: req.body.description,
        profile_img: req.body.profile_img,
        tags: req.body.tags,
        features: req.body.features,
    })
    
    // Add new vehicle.
    newCar.save()
    .then( (newCar) => {
        console.log('Car added.')
        res.json({ message: 'Vehicle saved.', data: newCar })
    })
    .catch( err => {
        console.log('Unable to insert car.', err)
        res.json({ message: 'Error creating vehicle.', error: err })
    })
})

// POST IMAGE
router.post('/image', (req, res) => {
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
})

// UPDATE A CAR
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
    Vehicle.deleteOne({ "_id": ObjectId(req.params.id) })
    .then( () => {
        res.json({ message: 'Vehicle deleted.' })
    })
    .catch ( err => {
        res.json({ message: 'Error deleting vehicle.', error: err })
    })
})

module.exports = router;