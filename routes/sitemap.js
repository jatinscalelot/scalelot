var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('sitemap', { title: 'Scalelot - Treat With Technologies', page: 'sitemap', layout : false });
});
module.exports = router;
