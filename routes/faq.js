var express = require('express');
var router = express.Router();

router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'PCDragon - FAQ' });
});

module.exports = router;