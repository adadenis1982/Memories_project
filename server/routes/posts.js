const router = require('express').Router();
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/posts.js');
// const { getPosts, getPost, createPost, updatePost, likePost, deletePost } = require('../controllers/posts.js');
/*
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
*/

router.get('/', getPosts)
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
