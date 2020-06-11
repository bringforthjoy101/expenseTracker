/**
 * Controller for User.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
 
var tools = require('./../modules/tools');
var dbLayer = require('../modules/dbLayer');

exports.getUser = function (req, res, next) {
    var viewData = {
        title: 'Main user page',
        userContents: 'This is main user page - it should use different layout',
        startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
        endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
        user: req.user,
    }
    res.render('userMain', viewData);

};

exports.getAllUsers = function (req, res, next) {
    var User = dbLayer.user;
    User.findAll().then(function(users) {
        var viewData = {
            title: 'Main admin page',
            adminContents: 'This is main admin page',
            users: users,
        }
        res.render('adminMain', viewData);
    });
};
 

exports.getUserSetup =  function(req, res, next) {
    var viewData = {
        title: 'Setup admin page'
    }
    res.render('adminSetup', viewData);
};