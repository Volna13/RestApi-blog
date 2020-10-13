var express = require('express');
var router = express.Router();

/* === GET all posts. === */
router.get('/getAllPost', function(req, res, next) {
  res.send('all post');
});

/* === GET post by Id === */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* === Add new post === */
router.post('/addPost', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
