const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    avatar: {
        data: Buffer,
        contentType: String,
        required: false
    },
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicles',
        required: false
    }]
})

module.exports = mongoose.model('Vehicles', VehicleSchema)