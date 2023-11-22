const dotenv = require('dotenv').config();
const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
let mongoose = require('mongoose');
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
app.use("/angular", express.static(__dirname + "/node_modules/angular"));
app.use("/intl-tel-input", express.static(__dirname + "/node_modules/ng-intl-tel-input"));
app.use(cors());
mongoose.set('runValidators', true);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log("Well done! , connected with mongoDB database");
}).on('error', error => {
  console.log("Oops! database connection error:" + error);
});
const apppaths = [
  { pathUrl: '/', routeFile: 'index'},
  { pathUrl: '/aboutus', routeFile: 'aboutus'},
  { pathUrl: '/blog', routeFile: 'blog'},
  { pathUrl: '/career', routeFile: 'career'},
  { pathUrl: '/contactus', routeFile: 'contactus'},
  { pathUrl: '/faq', routeFile: 'faq'},
  { pathUrl: '/feedback', routeFile: 'feedback'},
  { pathUrl: '/portfolio', routeFile: 'portfolio'},
  { pathUrl: '/upload', routeFile: 'upload'},
  { pathUrl: '/services', routeFile: 'services'},
  { pathUrl: '/team', routeFile: 'team'},
  { pathUrl : '/sitemap.xml', routeFile: 'sitemap'}
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
