const mongoose = require('mongoose');
const userSchema = require('./User.js');



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "no description",
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
       
    },
    imageUrl:{
        type: String,
        required: true
    },
    seller: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
      },
    phone: {
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);