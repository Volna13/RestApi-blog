let router = require("express").Router();
const commentsController = require("../controllers/comments.controller");
const jwtConfig = require("../config/jwt.config");

/* === Create new comment to post (requires authentication) === */
router.post('/addCommentPost/:id', jwtConfig.checkAuth, commentsController.createComment);

/* === GET all comments to post === */
router.get('/getCommentsPost/:id', commentsController.findAllComment);

module.exports = router;
