var express = require('express');
var router = express.Router();

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'PCDragon - Checkout' });
});

module.exports = router;