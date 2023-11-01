var express = require('express');
var router = express.Router();

router.get('/product', function(req, res, next) {
  res.render('product', { title: 'PCDragon - Product' });
});

module.exports = router;