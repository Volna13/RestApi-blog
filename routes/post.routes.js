const postsController = require("../controllers/post.controller");
let router = require("express").Router();

/* === Add new post === */
router.post('/addPost',postsController.createPost)

/* === GET all posts with conditions. === */
router.get('/getAllPost', postsController.findAllPosts)

/* === GET post by Id === */
router.get('/:id', postsController.findOnePost)
module.exports = router;

