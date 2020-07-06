var tools = require('./../modules/tools');
var dbLayer = require('./../modules/dbLayer');
var auth = require('./../modules/auth');

exports.getLogin = function(req, res, next) {
    var viewData = {
        title: 'Login page',
    }
    res.render('loginMain', viewData);
};

exports.getSignup = function(req, res, next) {
    auth.createUser(req, res, function(data) {
        var viewData = {
            title: 'Signup page',
            message: data.message,
        }
        res.render('loginSignup', viewData);
    });
};