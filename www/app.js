var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'ticket-log',
  streams: [
    {
      level: 'trace',
      stream: process.stdout
    },
    {
      level: 'debug',
      stream: process.stdout
    },
    {
      level: 'info',
      // stream: process.stdout,
      path: path.join(__dirname, './data/bunyan-logs/info.log')
    },
    {
      level: 'warn',
      // stream: process.stdout,
      path: path.join(__dirname, './data/bunyan-logs/warn.log')
    },
    {
      level: 'error',
      // stream: process.stdout,
      path: path.join(__dirname, './data/bunyan-logs/error.log')
    },
    {
      level: 'fatal',
      // stream: process.stdout,
      path: path.join(__dirname, './data/bunyan-logs/fatal.log')
    },
  ]
});

var app = express();

// inject bunyan
app.use(function (req, res, next) {
  req.log = log;
  next();
});

app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    req.log.error(err);
    res.status(err.status || 500);
    res.json({
      err: 500,
      msg: err.msg,
      data: err.toString()
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  req.log.error(err);
  res.status(err.status || 500);
  res.json({
    err: 500,
    msg: '服务异常'
  });
});


module.exports = app;
