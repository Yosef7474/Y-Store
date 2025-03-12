const mongoose = require('mongoose');
const userSchema = require('./User.js');



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: {
        type: Number,
        required: true
    }
});