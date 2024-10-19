// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticateController');

router.post('/signup', authenticateController.signupUser);
router.post('/login', authenticateController.loginUser);

module.exports = router;
