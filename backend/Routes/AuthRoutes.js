const express = require('express');
const router = express.Router();
const {signup}=require('../Controllers/AuthController');
const {signupValidation}=require('../Middlewares/AuthValidation');
const {login}=require('../Controllers/AuthController');
const {loginValidation}=require('../Middlewares/AuthValidation');


router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);


module.exports = router;
