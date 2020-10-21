const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const postsController = require('../controllers/post.controller');
const jwtConfig = require('../config/jwt.config');

/* === Add new post  (requires authentication) === */
router.post('/addPost', jwtConfig.checkAuth, asyncHandler(postsController.createPost));

/* === GET all posts with conditions. === */
router.get('/getAllPost', asyncHandler(postsController.findAllPosts));

/* === GET post by Id === */
router.get('/:id', asyncHandler(postsController.findOnePost));

module.exports = router;
