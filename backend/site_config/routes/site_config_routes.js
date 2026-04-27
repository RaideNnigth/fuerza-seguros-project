const express = require('express');
const router = express.Router();
const controller = require('../controllers/site_config_controller');
const verifyToken = require('../../user_auth/middleware/verify_token');

router.get('/whatsapp', controller.getWhatsappConfig);
router.put('/whatsapp', verifyToken, controller.updateWhatsappConfig);

module.exports = router;
