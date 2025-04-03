const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F825566175412927173%2F&psig=AOvVaw3J7Zm9f2wY2J1Jw8z4ZQ4d&ust=1632270681033000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjV2K7Y6fMCFQAAAAAdAAAAABAD"

    },
    isAdmin: {
        type: Boolean,
        
        default: false
    },
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null
      }],
    createdAt:{
        type: Date,
        default: Date.now
    }
    });

    

    userSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
            this.password = await bycrypt.hash(this.password, 10);
        }
        next();
    });
module.exports = mongoose.model('User', userSchema);    