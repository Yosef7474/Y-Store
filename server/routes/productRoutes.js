const express = require('express')
const multer = require('multer')
const productController = require('../controllers/productController')
const router = express.Router();

// configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// add new product
router.post('/add', upload.single('imageUrl'), productController.addProduct);
// get all products
router.get('/', productController.getProducts);

module.exports = router;

