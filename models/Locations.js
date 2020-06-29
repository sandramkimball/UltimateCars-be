const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
    street_address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Locations', LocationSchema)
