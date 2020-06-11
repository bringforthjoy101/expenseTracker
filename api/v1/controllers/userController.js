/**
 * Author controller for API endpoint.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
 
var async = require('async')
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

var express = require('express');

var router = express.Router();
var tools = require('../../../modules/tools');
var dbLayer = require('../../../modules/dbLayer');

exports.getUser = function (req, res, next) {
    var viewData = {
        title: 'Main user page',
        userContents: 'This is main user page - it should use different layout',
        startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
        endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
        user_details: req.user,
        // dummy
        "address": {
          "city": null,
          "country": null,
          "line1": null,
          "line2": null,
          "postal_code": null,
          "state": null
        }
    }
        return res.status(200).json({
                success:  true,
                satus: 200,
                "resource": "user",
                "url": "api/v1/user",
                data: {
                    user_content: viewData,
                    }
    });

};

exports.getAllUsers = function (req, res, next) {
    var User = dbLayer.user;
    User.findAll().then(function(users) {
        var viewData = {
            title: 'Main admin page',
            adminContents: 'This is main admin page',
            users: users,
        }
            return res.status(200).json({
                success:  true,
                satus: 200,
                "resource": "user",
                "url": "api/v1/user",
                data: {
                    user_detail: viewData
                    }
    });
    });
};
 

exports.getUserSetup =  function(req, res, next) {
    var viewData = {
        title: 'Setup admin page'
    }
    res.render('adminSetup', viewData);
};