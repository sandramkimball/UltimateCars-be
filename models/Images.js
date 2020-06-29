const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
        required: true
    },
})

module.exports = mongoose.model('Images', ImageSchema)