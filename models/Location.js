const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
    street: {
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
    other: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Location', LocationSchema)
