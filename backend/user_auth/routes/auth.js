const express = require('express');
const { registerUser, loginUser, refreshToken, verifyToken } = require('../controllers/auth_controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.get('/verify', verifyToken);

module.exports = router;
