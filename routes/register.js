const express = require('express');
const router = express.Router();
const userDao = require('../models/user-dao');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    res.render('register', { title: 'PCDragon - Register' });
  }
});

router.post('/', [
  //check('password').isLength({min: 8}).withMessage('The password must be at least 8 characters long.')
], async function(req, res, next) {
  try {
    await userDao.registerUser(req.body.email, req.body.username, req.body.firstName, req.body.lastName, req.body.password);
  res.redirect('/index');
  }
  catch (error){
    res.render('register', { title: 'PCDragon - Register', message: 'Email already registered.' });
  }
});

module.exports = router;