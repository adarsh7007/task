const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        Max: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        Max: 30
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,

    },
 
}, {
    timestamps: true
})
userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });
userSchema.virtual('fullname')
    .get(function () {
        return `${this.firstname}${this.lastname};`
    });
userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compare(password, this.hash_password);
    }
}
module.exports = mongoose.model('User', userSchema)