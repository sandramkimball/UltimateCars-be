const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: false
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Images',
        required: false
    }]
})

module.exports = mongoose.model('Posts', PostSchema)