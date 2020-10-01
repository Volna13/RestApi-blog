var express = require('express');
var router = express.Router();

/* === Create new user. === */
router.post('/register', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* === Log-in user === */
router.get('/log-in', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
