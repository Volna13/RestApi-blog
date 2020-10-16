const posts = require("../controllers/post.controller");
let router = require("express").Router();

/* === Add new post === */
router.post('/addPost',posts.createPost)

/* === GET all posts with conditions. === */
router.get('/getAllPost', posts.findAllPosts)

/* === GET post by Id === */
router.get('/:id', posts.findOnePost)
module.exports = router;

