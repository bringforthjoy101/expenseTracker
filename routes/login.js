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
var fetch = require('node-fetch');
var auth = require('./../modules/auth');
var loginController = require('../controllers/loginController');

// router.get('/', loginController.getLogin);
// router.get('/', loginController.getSignup);

router.get('/', function(req, res, next) {
    
    var viewData = {
        title: 'Login', 
        page: 'authPage',
        display: 'login',
        layout: 'layouts/auth',
        message: '',
    }
    console.log(req.session.flash.error);
    res.render('pages/index', viewData);
});

// router.post('/', function(req, res, next) {
//     var passport = req.app.get('passport');
//     passport.authenticate('local', { failureRedirect: '/login?f=1', successRedirect: '/dashboard' });
// });

router.post('/signup', async function(req, res, next) {
    let { firstname, lastname, username, email, password, current_business, dept, role } = req.body;

    let errors = [];

      console.log({
        firstname,
        email,
        password,
      });
    
      if (!firstname || !lastname || !email || !password || !current_business || !dept || !role ) {
        errors.push({ message: "Please enter all fields" });
      }
    
      if (password.length < 6) {
        errors.push({ message: "Password must be a least 6 characters long" });
      }
      
      if (username.length < 6) {
        errors.push({ message: "Username must be a least 6 characters long" });
      }
    
    //   if (password !== password2) {
    //     errors.push({ message: "Passwords do not match" });
    //   }
    if (errors.length > 0) {
        // const roles = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense/roles', {method: 'GET'});
        // const departments = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense/departments', {method: 'GET'});
        // const response = await roles.json();
        // const response2 = await departments.json();
        var viewData = {
            title: 'Sign Up', 
            page: 'authPage',
            display: 'signup',
            errors, 
            firstname, lastname, username, 
            email, password, 
            current_business, dept, role,
            // roles: response.data,
            // departments: response2.data,
            layout: 'layouts/auth',
        }
        res.render("pages/index", viewData);
      } else {
        auth.createUser(req, res, function(data) {
            console.log('this is the sigup status ' + data.success);
            
            var viewData = {
                title: 'Login',
                page: 'authPage',
                display: 'login',
                layout: 'layouts/auth',
                message: data.message,
            }
            res.render('pages/index', viewData);
        });
      }
});

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/expense");
//   }
//   next();
// }


module.exports = router;
