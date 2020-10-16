const comments = require("../controllers/comments.controller");
let router = require("express").Router();

/* === Create new comment to post === */
router.post('/addCommentPost/:id', comments.createComment);

/* === GET all comments to post === */
router.get('/getCommentsPost/:id', comments.findAllComment);

module.exports = router;
