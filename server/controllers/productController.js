const Product = require('../models/Product');
const User = require('../models/User');
// add new product

exports.addProduct = async (req, res) => {
    

    const { name, description, price, imageUrl, phone, address } = req.body;

    try {
        const product = new Product({ name, description, price, imageUrl, phone, address, seller: {
        id: req.user.id, // Seller ID
        name: req.user.name, // Seller username
        phone: req.user.phone, // Seller phone number
      } });
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name email phone');
        res.status(200).json( products );
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name email phone');
        res.status(200).json( product );
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

