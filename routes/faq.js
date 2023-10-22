var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/faq', function(req, res, next) {
  res.render('FAQs');
});

module.exports = router;
