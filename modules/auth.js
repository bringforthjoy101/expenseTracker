/**
 * Auth Module.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
var bCrypt = require('bcrypt-nodejs');
var Strategy = require('passport-local').Strategy;
var dbLayer = require('../modules/dbLayer');
var auth = {};

function generateHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

function isValidPassword(userpass, password) {
    return bCrypt.compareSync(password, userpass);
}

auth.initializeStrategy = function(passport) {
    passport.use('local', new Strategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, cb) {
            dbLayer.Employee.findOne({
                where: {
                    email: email
                }
            }).then(function(employee) {
                if (!employee) {
                    return cb(null, false);
                }
                if (!isValidPassword(employee.password, password)) {
                    return cb(null, false);
                }

                var userinfo = employee.get();
                employee.update({
                    last_login: Date.now()
                })
                return cb(null, userinfo);

            }).catch(function(err) {
                console.log("Error:", err);
                return cb(null, false);
            });
        }));

    passport.serializeUser(function(employee, cb) {
        cb(null, employee.id);
    });

    passport.deserializeUser(function(id, cb) {
        dbLayer.Employee.findById(id).then(function(employee) {
            if (employee) {
                cb(null, employee);
            } else {
                return cb(null);
            }
        });
    });

};

auth.createUser = function(req, res, next) {
    var Employee = dbLayer.Employee;
    Employee.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(employee) {
        if (employee) {
            next({
                success: false,
                message: 'That email is already taken'
            });
        } else {
            var userPassword = generateHash(req.body.password);
            var data = {
                email: req.body.email,
                username: req.body.username,
                password: userPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                RoleId: req.body.role,
                DepartmentId: req.body.dept
                // more info here for user
            };

            Employee.create(data).then(function(newEmployee, created) {
                if (!newEmployee) {
                    next({
                        success: false,
                        message: 'Error when trying to create new Employee'
                    });
                };
                if (newEmployee) {
                    next({
                        success: true,
                        message: 'Employee created'
                    });
                };
            });
        };
    });
};

module.exports = auth;
