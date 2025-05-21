const express = require('express');
const router = express.Router();
const tagController = require('../controller/tag_controller');


router.post('/', tagController.createTag);
router.get('/', tagController.getTags);

module.exports = router;
