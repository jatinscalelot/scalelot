var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('faq', { title: 'Scalelot - Treat With Technologies', page: 'faq' });
});
module.exports = router;
