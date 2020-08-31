var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

var settings = require('./settings');

var flash = require('connect-flash');

var session = require('express-session');  
var MongoStore = require('connect-mongo')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var square = require('./routes/square');

var app = express();

//var server = require('http').createServer(app);
var io = require('socket.io').listen(8888);

//server.listen(8888);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('stel'));
//Set session
app.use(session({
  resave: false, 
  saveUninitialized: true, 
  cookie:{maxAge:3600000},
  secret:settings.cookieSecret,
  store:new MongoStore({
    db:settings.db,
    url: settings.host  
  })
}));

/*app.use(function(req, res, next){
  io.sockets.on('connection', function (socket) {
    //flash ability
    if(typeof req.session.err != undefined)
    {
        socket.emit('Err',req.session.err);
        delete req.session.err;
    }
    else {
      socket.emit('Err',req.session.err);
    };
    if(typeof req.session.success != undefined)
    {
        console.log("success: ",req.session.success);
        socket.emit('Success',req.session.success);
        delete req.session.success;
    }
    else {
      socket.emit('success',req.session.success);
    };

});
  next();
});*/

function notIFlogin(req, res, next) {
if (!req.session.user) {
req.session.err='请先登陆';
return res.redirect('/login');
}
next();
}
function IFlogin(req, res, next) {
if (req.session.user) {
req.session.err='您已登陆';
return res.redirect('/');
}
next();
}

app.use(function(req, res, next){
  //Deal with err or success
var err = req.session.err;
var success = req.session.success;
var iflogin = req.session.user;
var ifn_words = 1, n_words = 0;
var ifr_words = 1, r_words = 0;
delete req.session.err;
delete req.session.success;

res.locals.message = '';
res.locals.iflogin = '';
if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
if (success) res.locals.message = '<div class="alert alert-success">' + success + '</div>';
if (ifn_words) res.locals.n_words = n_words;
if (ifr_words) res.locals.r_words = r_words;
if (iflogin) res.locals.iflogin = req.session.user.username;
next();
});


app.get('/', routes);

app.get('/addwords', routes);
app.post('/addwords', routes);
app.get('/searchwords',routes);
app.get('/managewords',routes);
app.get('/reviewwords',routes);
app.post('/login',routes);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
