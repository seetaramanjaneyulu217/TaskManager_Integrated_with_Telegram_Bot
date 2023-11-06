const express = require('express')
const router = express.Router()

// Imports from Routes
const { sendOTPToTheUser, registerUser } = require('../controllers/UserLoginControllers.js')

// Routes
router.route('/sendotp').post(sendOTPToTheUser)
router.route('/login').post(registerUser)

module.exports = router