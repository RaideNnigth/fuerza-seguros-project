const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blog_post_controller');
const verifyToken = require('../../user_auth/middleware/verify_token');

router.post('/', verifyToken, blogPostController.createPost);
router.get('/', blogPostController.getAllPosts);
router.get('/:id', blogPostController.getPostById);
router.delete('/:id', verifyToken, blogPostController.deletePost);
router.get('/tags/:tag', blogPostController.getPostsByTag);


module.exports = router;
