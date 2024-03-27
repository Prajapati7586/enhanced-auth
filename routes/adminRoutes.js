const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Create Admin
router.post("/create-admin", adminController.createAdmin);

module.exports = router;
