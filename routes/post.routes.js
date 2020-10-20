let router = require("express").Router();
const postsController = require("../controllers/post.controller");
const jwtConfig = require("../config/jwt.config");

/* === Add new post  (requires authentication) === */
router.post('/addPost', jwtConfig.checkAuth, postsController.createPost)

/* === GET all posts with conditions. === */
router.get('/getAllPost', postsController.findAllPosts)

/* === GET post by Id === */
router.get('/:id', postsController.findOnePost)

module.exports = router;

