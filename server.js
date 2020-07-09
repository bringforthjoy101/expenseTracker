var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var passport = require('passport');
const flash = require("express-flash");
var auth = require('./modules/auth.js');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config.' + env);

//// ROUTES FOR VIEW USING HBS /////
var index = require('./routes/index');
var login = require('./routes/login');

//// ROUTES FOR API END POINT /////
var expenseAPI = require('./api/routes/api');

var tools = require('./modules/tools');
var sessionManagement = require('./modules/sessionManagement');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(ejsLayouts);
app.use('/public',express.static('public'));

//
// App level variables initialization
//
// value to play with on request start and end
app.set('executionsThisTime', 0);
app.set('config', config);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// session will not work for static content
app.set('trust proxy', 1); // trust first proxy
app.use(sessionManagement);
// passport initialization
auth.initializeStrategy(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('passport', passport);

//
// General toolset
//
// on request start and on request end moved after static content
app.use(tools.onRequestStart);
app.use(tools.onRequestEnd);
// generate menu of the application
app.use(tools.generateMainMenu);
// app.use('/dashboard', tools.generateUserMenu);


// authentication
app.post('/login', passport.authenticate('local', 
    { 
        successRedirect: '/dashboard', 
        failureRedirect: '/login', 
        failureFlash: true 
    }),
);

app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/login');
    });
    
const authenticationMiddleware = (req, res, next) => {
    if( req.isAuthenticated() ) {
        return next();
    }
    return res.status(401).send({error: 'You must be logged in'});
    // res.redirect('/login/?m=not-logged-in');
};
// app.use(authenticationMiddleware);
    


//
// routing
//
app.use('/', index);
app.use('/login', login);

app.use('/dashboard', 
    function(req, res, next) {
    res.locals.layout = 'layout_user';
    next();
});


app.use('/api', authenticationMiddleware);

//// API ENDPOINTS ///
app.use('/api', expenseAPI);


// error handling
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    var viewData = {
        parent: 'Home',
        parentUrl: '/dashboard',
        title: 'Error',
        user: req.user,
        error: err,
        page: 'errorPage',
        layout: 'layouts/auth'
    }
    res.render('pages/error', viewData);
});

module.exports = app;
