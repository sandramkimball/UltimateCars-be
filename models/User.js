const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
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
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
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

UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
})

schema.methods.validatePassword = async function validatePassword(data){
    return bcrypt.compare(data, this.password)
}


module.exports = mongoose.model('User', UserSchema)