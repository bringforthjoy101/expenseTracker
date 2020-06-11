/**
 * Controller for Index.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */

var tools = require('./../modules/tools');
var dbLayer = require('./../modules/dbLayer');
var auth = require('./../modules/auth');

/* GET home page. */
exports.getIndex = function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
};

exports.getAbout = function (req, res, next) {
    var d = new Date();
    var viewData = {
        year: d.getFullYear(),
        testVariable: 'User Agent: ' + req.headers['user-agent'],
        title: 'About us page'
    };
    res.render('about', viewData);
};