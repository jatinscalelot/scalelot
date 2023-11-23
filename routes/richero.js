var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('case_study_Richero', { title: 'Scalelot - Treat With Technologies', page: 'case_study_Richero' });
});
module.exports = router;
