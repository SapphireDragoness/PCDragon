const indexRouter = require('./routes/index');
const faqRouter = require('./routes/faq');
const registerRouter = require('./routes/register');
const productRouter = require('./routes/product');
const checkoutRouter = require('./routes/checkout');
const profileBuyerRouter = require('./routes/profile-buyer');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index'); 
});
app.get('/faq', (req, res) => {
  res.render('faq'); 
});
app.get('/register', (req, res) => {
  res.render('register'); 
});
app.get('/product', (req, res) => {
  res.render('product'); 
});
app.get('/profile-buyer', (req, res) => {
  res.render('profile-buyer'); 
});
app.get('/checkout', (req, res) => {
  res.render('checkout'); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/register', registerRouter);
app.use('/product', productRouter);
app.use('/faq', faqRouter);
app.use('/checkout', checkoutRouter);
app.use('/profile-buyer', profileBuyerRouter);

module.exports = app;
