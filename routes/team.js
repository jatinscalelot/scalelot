var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('team', { title: 'Scalelot - Treat With Technologies', page : 'team' });
});
module.exports = router;
