var express = require('express');
var router = express.Router();

router.get('/profile-buyer', function(req, res, next) {
  res.render('profile-buyer', { title: 'PCDragon - Profile' });
});

module.exports = router;