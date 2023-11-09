var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Scalelot - Treat With Technologies', page : 'services' });
});
router.get('/webdevelopment', function(req, res, next) {
  res.render('web_dev_service', { title: 'Scalelot - Treat With Technologies', page : 'web_dev_service' });
});
router.get('/applicationdevelopment', function(req, res, next) {
  res.render('app_dev_service', { title: 'Scalelot - Treat With Technologies', page : 'app_dev_service' });
});
router.get('/uiuxdesign', function(req, res, next) {
  res.render('uiux_service', { title: 'Scalelot - Treat With Technologies', page : 'uiux_service' });
});
router.get('/digitalmarketing', function(req, res, next) {
  res.render('digital_service', { title: 'Scalelot - Treat With Technologies', page : 'digital_service' });
});
router.get('/contentcreation', function(req, res, next) {
  res.render('content_service', { title: 'Scalelot - Treat With Technologies', page : 'content_service' });
});
module.exports = router;
