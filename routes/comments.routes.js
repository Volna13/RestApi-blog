const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const commentsController = require('../controllers/comments.controller');
const jwtConfig = require('../config/jwt.config');

/* === Create new comment to post (requires authentication) === */
router.post('/addCommentPost/:id', jwtConfig.checkAuth, asyncHandler(commentsController.createComment));

/* === GET all comments to post === */
router.get('/getCommentsPost/:id', asyncHandler(commentsController.findAllComments));

module.exports = router;
