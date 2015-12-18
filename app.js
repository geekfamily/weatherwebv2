
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//var express = require('express'),
//  path = require('path'),
//var favicon = require('serve-favicon');
//var logger = require('morgan'),
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser'),
var mongoose = require('./app/config/mongooseconfig');
var express = require('./app/config/expressconfig'),
  port = process.env.PORT || 3000;

var routes = require('./app/routes/index');

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

var http = require('http');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);
var socketHelper = require('./app/services/socketservice');

httpServer.listen(port, function(){
  socketHelper.setSocket(io);
  console.log("server listening on port: ", port);
});

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;


//var app = express();
//
//// view engine setup
//app.set('views', path.join(__dirname, 'app/views'));
//app.set('view engine', 'jade');
//
//// uncomment after placing your favicon in /client
////app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(require('node-sass-middleware')({
//  src: path.join(__dirname, 'client'),
//  dest: path.join(__dirname, 'client'),
//  indentedSyntax: true,
//  sourceMap: true
//}));
//app.use(express.static(path.join(__dirname, 'client')));
//
//app.use('/', routes);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});
//
//
//module.exports = app;
