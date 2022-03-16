const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user_controller');


router.get('/profile', usersController.profile);

// to get the signin page

router.get('/sign-in', usersController.signIn);

// to get the signup page

router.get('/sign-up', usersController.signUp);

// post the user sign up details

router.post('/create', usersController.create);

module.exports = router;