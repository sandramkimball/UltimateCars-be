const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImageSchema = mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
        required: false
    },
})

module.exports = mongoose.model('Images', ImageSchema)