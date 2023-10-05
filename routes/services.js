var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Scalelot - Treat With Technologies' });
});
router.get('/webdevelopment', function(req, res, next) {
  res.render('web_dev_service', { title: 'Scalelot - Treat With Technologies' });
});
router.get('/applicationdevelopment', function(req, res, next) {
  res.render('app_dev_service', { title: 'Scalelot - Treat With Technologies' });
});
router.get('/uiuxdesign', function(req, res, next) {
  res.render('uiux_service', { title: 'Scalelot - Treat With Technologies' });
});
router.get('/digitalmarketing', function(req, res, next) {
  res.render('digital_service', { title: 'Scalelot - Treat With Technologies' });
});
router.get('/contentcreation', function(req, res, next) {
  res.render('content_service', { title: 'Scalelot - Treat With Technologies' });
});
module.exports = router;
