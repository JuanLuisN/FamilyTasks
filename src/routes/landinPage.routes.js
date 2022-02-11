const express = require('express')
const router = express.Router()

const landingPageController = require('../controllers/landingPage.controller')

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router