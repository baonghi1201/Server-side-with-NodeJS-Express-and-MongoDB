var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

//Connecting Server to MongoDB database (back-end)

const mongoose=require('mongoose');

const Dishes= require('./models/dishes');

const Promotions = require('./models/promotions');

const Leaders= require('./models/leaders');

const { Console } = require('console');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log('Connected correctly to Server');
}, err => {
  Console.log(err);
});

//Connecting Server to MongoDB database (back-end)


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Cookies that help remember the authentication from the user, reduce the amount of time user have to re-input their username & password
// app.use(cookieParser('84769-48769-88860-38357'));

app.use(session({
  name:'session-id',
  secret:'84769-48769-88860-38357',
  saveUninitialized:'false',
  resave: false,
  store: new FileStore()
}))

function auth(req, res, next){
  console.log(req.session);

  if (!req.session.nghi){
    var authHeader = req.headers.authorization;
    
    if (!authHeader){
      var err = new Error('You are not authenticated');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status=401;
      next(err);
      return;
    }
    
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    
    var username=auth[0];
    var password=auth[1];

    if (username=='admin' && password =='pass'){
      req.session.nghi='admin';
      next(); // authorized
    }
    else{
      var err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic'); 
      err.status=401;
      next(err);
    }
  }
  else{
    if (req.session.nghi === 'admin'){
      console.log('req.session: ', req.session);
      next();

    }
    else{
      var err = new Error('You are not authenticated');
      err.status=401;
      next(err);
    }
  }
}

app.use(auth);

// Cookies that help remember the authentication from the user, reduce the amount of time user have to re-input their username & password

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders', leaderRouter);

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

module.exports = app;
