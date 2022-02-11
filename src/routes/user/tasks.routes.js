const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const familyTasks = require('../../controllers/user/tasks.controller')

router.get('/tasks', authMiddleware.isLoggedIn, familyTasks.renderFamilyTasks)
router.post('/addTask', authMiddleware.isLoggedIn, familyTasks.SaveTask)

module.exports = router