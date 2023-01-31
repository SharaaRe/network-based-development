const express = require('express');
const controller = require('../controllers/userController');
const {isGuest} = require('../middlewares/auth');
const {isAuthenticated} = require('../middlewares/auth');

const router = express.Router();

//GET /users/new: send html form for creating a new user account

router.get('/new', isGuest, controller.new);


//POST /users: create a new user account

router.post('/', isGuest, controller.create);

//POST /users/login: sends html form for user's login

router.get('/login', isGuest, controller.getUserLogin);


//POST /users/login: authenticates user's login

router.post('/login', isGuest, controller.login);

//GET /users/profile: send user's profile page
router.get('/profile', isAuthenticated, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isAuthenticated, controller.logout);

module.exports = router;
