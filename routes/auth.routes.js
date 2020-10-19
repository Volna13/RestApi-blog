const userController = require("../controllers/user.controller");
let router = require("express").Router();


/* === Create new user. === */
router.post('/register', userController.createUser);

/* === Log-in user === */
router.post('/login', userController.loginUser);

module.exports = router;
