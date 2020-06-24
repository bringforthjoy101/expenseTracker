/**
 * Login Routes.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var auth = require('./../modules/auth');
var loginController = require('../controllers/loginController');

// router.get('/', loginController.getLogin);
// router.get('/', loginController.getSignup);

router.get('/', function(req, res, next) {
    var viewData = {
        title: 'Login',
        layout: 'layouts/auth',
        message: '',
    }
    console.log(req.session.flash.error);
    res.render('pages/login', viewData);
});

// router.post('/', function(req, res, next) {
//     var passport = req.app.get('passport');
//     passport.authenticate('local', { failureRedirect: '/login?f=1', successRedirect: '/dashboard' });
// });

router.post('/signup', function(req, res, next) {
    auth.createUser(req, res, function(data) {
        var viewData = {
            title: 'Login',
            layout: 'layouts/auth',
            message: data.message,
        }
        res.render('pages/login', viewData);
    });
});

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/expense");
//   }
//   next();
// }


module.exports = router;
