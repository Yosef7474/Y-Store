const Product = require('../models/Product');
const User = require('../models/User');
// add new product

exports.addProduct = async (req, res) => {
    

    const { name, description, price, imageUrl, category, address } = req.body;

    try {
        const product = new Product({ name, description, price, imageUrl,category, address, seller: {
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
// get my product
exports.getMyProducts = async (req, res) => {
    try {
        // Verify the user exists
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find products where seller.id matches user._id
        const products = await Product.find({ 'seller.id': req.user._id });
        
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching user products:', error);
        res.status(500).json({ 
            message: "Server error",
            error: error.message 
        });
    }
};

// update product
exports.updateProducts = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message: 'product not found'})
        }

        if (product.seller.id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this product" });
        }
        
        const updateProducts = await Product.findByIdAndUpdate( req.params.id, req.body, {new: true} )

        res.status(200).json({message: "updated !!!", product: updateProducts})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// delete Product 
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message: "product not found"})
        }
        if (product.seller.id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this product" });
        }

        await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { products: product._id } }
        );

        await product.deleteOne();

        res.status(200).json({message: "product deleted !!!"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get liked products
exports.likedProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('liked');
    res.json(user.liked);
    } catch (error) {
        console.error(err.message);
    res.status(500).send('Server Error');
    }
}

// add products to liked
exports.likeProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
    const product = await Product.findById(req.params.productId);

    if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

       // Check if already liked
    if (user.likedProducts.includes(req.params.productId)) {
        return res.status(400).json({ msg: 'Product already liked' });
      }
      user.likedProducts.push(req.params.productId);
    await user.save();
    res.json(user.likedProducts);
    } catch (err) {
        console.error(err.message);
    res.status(500).send('Server Error');
    }
}


// remove product from liked
exports.removeLikedProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const index = user.likedProducts.indexOf(req.params.productId);
        if (index === -1) {
          return res.status(400).json({ msg: 'Product not in liked list' });
        }
    
        user.likedProducts.splice(index, 1);
        await user.save();
        
        res.json(user.likedProducts);
    } catch (error) {
        console.error(err.message);
    res.status(500).send('Server Error');
    }
}


