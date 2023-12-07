'use strict'

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const fileUpload = require('express-fileupload');

const userDao = require('./models/user-dao.js');

const indexRouter = require('./routes/index')
const faqRouter = require('./routes/faq');
const registerRouter = require('./routes/register');
const productRouter = require('./routes/product');
const checkoutRouter = require('./routes/checkout');
const profileBuyerRouter = require('./routes/profile-buyer');

// init express
const app = express();
const port = 3000;

// routes
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/register', registerRouter);
app.use('/product', productRouter);
app.use('/faq', faqRouter);
app.use('/checkout', checkoutRouter);
app.use('/profile-buyer', profileBuyerRouter);

// set up the "username and password" login strategy
// by setting a function to verify username and password
/* passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
)); */

// every requests body will be considered as in JSON format
app.use(express.json());

// set up the 'public' component as a static website
/* app.use(express.static('public')); */

// set up the session
app.use(session({
  //store: new FileStore(), // by default, Passport uses a MemoryStore to keep track of the sessions - if you want to use this, launch nodemon with the option: --ignore sessions/
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
