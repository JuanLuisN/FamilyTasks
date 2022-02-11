const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const familyTasks = require('../../controllers/applicationControllers/familyuserControllers/tasks.controller')

router.get('/tasks', authMiddleware.isLoggedIn, familyTasks.renderFamilyTasks)
router.post('/tasks/add', authMiddleware.isLoggedIn, familyTasks.SaveTask)
router.get('/tasks/edit/:id', authMiddleware.isLoggedIn, familyTasks.CompleteTask)

module.exports = router