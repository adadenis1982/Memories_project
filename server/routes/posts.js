const router = require('express').Router();
const { getPost, getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, commentPost } = require('../controllers/posts.js');
const auth = require('../middleware/auth');

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.put('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);


module.exports = router;
