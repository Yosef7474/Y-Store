const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// register user

router.post('/register', authController.register);
// login user
router.post('/login', authController.login);

module.exports = router;