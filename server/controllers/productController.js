const Product = require('../models/Product');
const User = require('../models/User');
// add new product

exports.addProduct = async (req, res) => {
    if (!req.User) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, description, price, imageUrl, phone, address } = req.body;

    try {
        const product = new Product({ name, description, price, imageUrl, phone, address, seller: req.user._id });
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
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

