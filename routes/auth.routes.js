const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/user.controller');

/* === Create new user. === */
router.post('/register', asyncHandler(userController.createUser));

/* === Log-in user === */
router.post('/login', asyncHandler(userController.loginUser));

module.exports = router;
