const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define User Model:
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
        required: false
    },
    _password: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    avatar: {
        data: Buffer,
        contentType: String,
        required: false
    }
})

// Virtuals - set methods
UserSchema
    .virtual('password')
    .set( password => {
        this._password = password
    })

// Pre Save?
UserSchema.pre('save', async function save(next) {
    if (this.password === undefined) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    return next()
})

// Methods
UserSchema.methods.validatePassword = async function validatePassword(data){
    return bcrypt.compare(data, this.password)
}


module.exports = mongoose.model('User', UserSchema)