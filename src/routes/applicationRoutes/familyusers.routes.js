const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const familyUsers = require('../../controllers/applicationControllers/familyleaderControllers/familyusers.controller')

router.get('/familyusers', authMiddleware.isLoggedIn, authMiddleware.isFamilyLeader, familyUsers.renderFamilyUsers)
router.post('/familyusers/add', authMiddleware.isLoggedIn, authMiddleware.isFamilyLeader, familyUsers.SaveFamilyuser)
router.post('/familyusers/edit/:id', authMiddleware.isLoggedIn, authMiddleware.isFamilyLeader, familyUsers.EditFamilyuser)
router.get('/familyusers/delete/:id', authMiddleware.isLoggedIn, authMiddleware.isFamilyLeader, familyUsers.DeleteFamilyUser)

module.exports = router