var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const apppaths = [
  { pathUrl: '/', routeFile: 'index'},
  { pathUrl: '/aboutus', routeFile: 'aboutus'},
  { pathUrl: '/blog', routeFile: 'blog'},
  { pathUrl: '/career', routeFile: 'career'},
  { pathUrl: '/contactus', routeFile: 'contactus'},
  { pathUrl: '/faq', routeFile: 'faq'},
  { pathUrl: '/feedback', routeFile: 'feedback'},
  { pathUrl: '/portfolio', routeFile: 'portfolio'},
  { pathUrl: '/projects', routeFile: 'projects'},
  { pathUrl: '/services', routeFile: 'services'},
  { pathUrl: '/team', routeFile: 'team'},
];
apppaths.forEach((path) => {
	app.use(path.pathUrl, require('./routes/' + path.routeFile));
});
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('index', { title: 'Scalelot - Treat With Technologies', layout : false });
});
module.exports = app;
