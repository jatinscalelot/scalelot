var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('portfolio', { title: 'Scalelot - Treat With Technologies', page : 'portfolio' });
});
module.exports = router;
