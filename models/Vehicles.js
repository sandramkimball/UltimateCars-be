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
    body: {
        type: String,
        required: false
    },
    drive: {
        type: String,
        required: false
    },
    newCar: {
        type: Boolean,
        required: false
    },
    engine: {
        type: String,
        required: false,
    },
    transmission: {
        type: String,
        required: false,
    },
    fuel: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    year: {
        type: Number,
        required: false,
    },
    miles: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    listingCreated: {
        type: Date,
        default: Date.now
    },
    vin: {
        type: String,
        unique: false,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    profile_img: {
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
    features: [{
        type: String,
        required: false
    }],
    user_id: {
        type: String,
        ref: 'User',
        required: false
    }
})

module.exports = mongoose.model('Vehicles', VehicleSchema)