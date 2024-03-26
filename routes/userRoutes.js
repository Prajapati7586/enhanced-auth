const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Edit user profile
router.put('/profile', auth, userController.editProfile);

// Set profile privacy
router.put('/profile/privacy', auth, userController.setPrivacy);

// List public profiles
router.get('/profiles', userController.listPublicProfiles);

// Get user profile by ID
router.get('/profile/:userId', auth, userController.getUserProfileById);

module.exports = router;
