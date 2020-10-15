var express = require('express');
var router = express.Router();

/* === GET all posts. === */
router.get('/getAllPost', function(req, res, next) {
  res.send('all post');
});

/* === GET post by Id === */
router.get('/:id', function(req, res, next) {
  res.send('post with id');
});

/* === Add new post === */
router.post('/addPost', function(req, res, next) {
  res.send('add new post');
});

module.exports = router;
