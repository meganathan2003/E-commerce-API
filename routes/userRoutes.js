// Below the code for API's Get and post in the end point 
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Below the code for all use route 
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

