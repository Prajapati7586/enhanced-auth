const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/myprofile', auth, userController.getProfile);

// Edit user profile
router.put('/myprofile', auth, userController.editProfile);

// Set profile privacy
router.put('/profile/privacy', auth, userController.setPrivacy);

// List public profiles
router.get('/profiles', userController.listPublicProfiles);


module.exports = router;
