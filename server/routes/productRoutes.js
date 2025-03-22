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

module.exports = router;

