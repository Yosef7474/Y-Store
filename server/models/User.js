const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
    });

    userSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
            this.password = await bycrypt.hash(this.password, 10);
        }
        next();
    });
module.exports = mongoose.model('User', userSchema);    