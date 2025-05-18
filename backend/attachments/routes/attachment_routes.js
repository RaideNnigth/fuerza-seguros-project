const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload_buffer');
const controller = require('../controllers/attachment_controller');
const verifyToken = require('../../user_auth/middleware/verify_token');

// Upload (proteja com token se necessário)
router.post('/', verifyToken, upload.single('file'), controller.uploadAttachment);

// List all attachments
router.get('/page/:index', controller.getAttachmentsPaginated);

// Download
router.get('/:id', controller.getAttachment);

// Download by filename
router.get('/filename/:name', controller.getAttachmentByFilename);
router.get('/filename/:name/all', controller.getAttachmentsByFilename);

// Delete
router.delete('/:id', verifyToken, controller.deleteAttachment);

module.exports = router;
