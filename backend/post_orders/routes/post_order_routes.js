const express = require('express');
const router = express.Router();
const controller = require('../controllers/post_order_controller');
const verifyToken = require('../../user_auth/middleware/verify_token');

router.put('/:tag', verifyToken, controller.updatePostOrder);
router.get('/:tag', controller.getPostOrderForTag);

module.exports = router;