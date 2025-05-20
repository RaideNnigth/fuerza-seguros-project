const express = require('express');
const router = express.Router();
const controller = require('../controllers/post_order_controller');

router.post('/', controller.setPostOrder);
router.put('/:tag', controller.updatePostOrder);

module.exports = router;