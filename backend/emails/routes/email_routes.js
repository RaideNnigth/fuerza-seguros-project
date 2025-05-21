const express = require('express');
const router = express.Router();
const emailController = require('../controller/email_controller');

router.post('/send', emailController.sendEmail);

module.exports = router;
