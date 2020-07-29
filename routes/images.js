const express = require('express')
const router = express.Router()

var Image = require('../models/Images')

// GET
router.get('/', (req, res) => {
    Images.findById(req.body.id)
    .then(image => {
        res.json({data: image})
    })
    .catch( err => {
        res.json({message: 'Image not found.', data: err})
    })
})

// POST
router.post('/', (req, res) => {
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

// DELETE
router.delete('/:id', (req, res) => {
    var id = req.params.id
    Images.findByIdAndDelete({ id })
    .then( () => {
        res.json({ message: 'Image deleted.' })
    })
    .catch ( err => {
        res.json({ message: 'Error deleting image.', error: err })
    })
})

module.exports = router;