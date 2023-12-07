const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('faq', { title: 'PCDragon - FAQ' });
});

module.exports = router;