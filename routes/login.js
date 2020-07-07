var express = require('express');
var router = express.Router();
var auth = require('./../modules/auth');


router.get('/', function(req, res, next) {
    if (req.user) {
        return res.redirect('/dashboard');
    }

    var viewData = {
        title: 'Login',
        page: 'authPage',
        display: 'login',
        layout: 'layouts/auth',
        message: '',

    }
    console.log('this is the error ' + req.session.flash.error);
    res.render('pages/index', viewData);
});

router.post('/signup', async function(req, res, next) {
    let {
        firstname,
        lastname,
        username,
        email,
        password,
        current_business,
        dept,
        role
    } = req.body;

    let errors = [];

    console.log({
        firstname,
        email,
        password,
    });

    if (!firstname || !lastname || !email || !password || !current_business || !dept || !role) {
        errors.push({
            message: "Please enter all fields"
        });
    }

    if (password.length < 6) {
        errors.push({
            message: "Password must be a least 6 characters long"
        });
    }

    if (username.length < 6) {
        errors.push({
            message: "Username must be a least 6 characters long"
        });
    }

    //   if (password !== password2) {
    //     errors.push({ message: "Passwords do not match" });
    //   }
    if (errors.length > 0) {

        var viewData = {
            title: 'Sign Up',
            page: 'authPage',
            display: 'signup',
            errors,
            firstname,
            lastname,
            username,
            email,
            password,
            current_business,
            dept,
            role,
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

module.exports = router;
