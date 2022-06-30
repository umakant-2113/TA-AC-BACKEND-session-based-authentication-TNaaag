var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require("mongoose");
let session=require("express-session");
let MongoStore=require("connect-mongo")

// connect mongoose 
mongoose.connect("mongodb://127.0.0.1/e-Commers",(err)=>{
  console.log(err ? err : "mongoose connected")
})

// router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middle ware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// router 
app.use(session({
  secret: "some rendom text",
  saveUninitialized:false,
  resave:false,
  store:new MongoStore({ mongoUrl: "mongodb://127.0.0.1/e-Commers"})
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products",require("./routes/product"))

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
