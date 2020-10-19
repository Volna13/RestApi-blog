const commentsController = require("../controllers/comments.controller");
let router = require("express").Router();

/* === Create new comment to post === */
router.post('/addCommentPost/:id', commentsController.createComment);

/* === GET all comments to post === */
router.get('/getCommentsPost/:id', commentsController.findAllComment);

module.exports = router;
