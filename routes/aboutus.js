var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('aboutus', { title: 'Scalelot - Treat With Technologies' });
});
module.exports = router;
