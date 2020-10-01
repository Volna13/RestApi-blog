var express = require('express');
var router = express.Router();

/* === GET all comments to post === */
router.get('/getCommentsPost', function(req, res, next) {
    res.send('respond with a resource');
});

/* === Create new comment to post === */
router.post('/addCommentPost', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
