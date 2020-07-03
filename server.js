/**
 * Sample App Server.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var ejsLayouts = require('express-ejs-layouts');
var passport = require('passport');
const flash = require("express-flash");
var auth = require('./modules/auth.js');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config.' + env);

//// ROUTES FOR VIEW USING HBS /////
var index = require('./routes/index');
var login = require('./routes/login');
var user = require('./routes/user');
var users = require('./routes/users');
// var expense = require('./routes/expense');
// var expenseAPI = require('./routes/api/expense');
var expenseAPI = require('./routes/api');

//// ROUTES FOR API END POINT /////
var userAPI = require('./api/v1/routes/user');
var usersAPI = require('./api/v1/routes/users');


var tools = require('./modules/tools');
var sessionManagement = require('./modules/sessionManagement');

var app = express();

//
// Handlebars / HBS setup and configuration
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(ejsLayouts);
app.use('/public',express.static('public'));
// partials will be stored in /views/partials
hbs.registerPartials(__dirname + '/views/partials');
// expose response locals and app locals to the templating system
hbs.localsAsTemplateData(app);

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
app.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true } ),
    // function(req, res) {
    //     res.redirect('/expense'); // change back to /user
    // }
    );
app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/login');
    });
    
const authenticationMiddleware = (req, res, next) => {
    // console.log('this is req.user' + req.user + 'this is req.user.email' + req.user.email + 'this is req.user.password' + req.user.password);
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

app.use('/dashboard', 
    function(req, res, next) {
    res.locals.layout = 'layout_user';
    next();
});

app.use('/users', users);

// app.use('/dashboard', index);
app.use('/api/expense', authenticationMiddleware);

app.use('/api/expense', expenseAPI);

//// API ENDPOINTS ///
app.use('/api/v1/user', userAPI);
app.use('/api/v1/users', usersAPI);


app.use('/login', login);

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
