const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

const profileController = require('../controllers/profile.controller')

router.get('/profile', authMiddleware.isLoggedIn, profileController.renderProfile)

module.exports = router