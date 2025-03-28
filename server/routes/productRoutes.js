const express = require('express')
const multer = require('multer')
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();
const upload = require('../utils/multer');




// add new product
router.post('/add',authMiddleware, upload.single('imageUrl'), productController.addProduct);
// get all products
router.get('/', productController.getProducts);
// get my products
router.get('/myproducts', authMiddleware, productController.getMyProducts);
// get single product
router.get('/:id', productController.getProduct);
// update product
router.put('/:id', authMiddleware, productController.updateProducts)
// delete product
router.delete('/:id', authMiddleware, productController.deleteProduct)





// add liked products
router.post('/like', authMiddleware, productController.likeProducts)
// get liked products
router.get('/getlike', authMiddleware, productController.likedProducts)
// remove liked products
router.delete('/removelike', authMiddleware,productController.removeLikedProducts)




module.exports = router;

