const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

const authController = require('../controllers/auth.controller')

router.get('/signup', authMiddleware.isNotLoggedIn, authController.renderSignUp)
router.get('/signin', authMiddleware.isNotLoggedIn, authController.renderSignIn)
router.get('/logout', authController.logOut)

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)


module.exports = router