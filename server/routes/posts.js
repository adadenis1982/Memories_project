const router = require('express').Router();
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts.js');
const auth = require('../middleware/auth');

router.get('/', getPosts)
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.put('/:id/likePost', auth, likePost);

module.exports = router;
