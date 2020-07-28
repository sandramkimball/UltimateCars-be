const mongoose = require('mongoose');
const Schema = mongoose.Schema

const VehicleSchema = mongoose.Schema({
    make: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    bodyType: {
        type: String,
        required: true
    },
    driveType: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    fuel: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    miles: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    listingCreated: {
        type: Date,
        default: Date.now
    },
    vin: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    tags: [{
        type: String,
        required: false,
    }],
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Images',
        required: false
    }],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Vehicles', VehicleSchema)