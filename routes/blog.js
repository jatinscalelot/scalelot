var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('blog', { title: 'Scalelot - Treat With Technologies', page : 'blog' });
});
module.exports = router;
