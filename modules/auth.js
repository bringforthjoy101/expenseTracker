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
            dbLayer.user.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    
                    return cb(null, false, { message: "No user with that email address" });
                }
                if (!isValidPassword(user.password, password)) {
                    console.log('I am here invalid password');
                    return cb(null, false, { message: "Password is incorrect" });
                }
                var userinfo = user.get();
                console.log('I am user ' + userinfo.firstname);
                user.update({
                    last_login: Date.now()
                })
                return cb(null, userinfo);

            }).catch(function(err) {
                console.log("Error:", err);
                return cb(null, false);
            });
        }));

    passport.serializeUser(function(user, cb) {
        
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        
        dbLayer.user.findById(id).then(function(user) {
            if (user) {
                console.log('I am user here !!!');
                cb(null, user);
            } else {
                console.log('I am user here !');
                return cb(null);
            }
        });
    });

};

auth.createUser = function(req, res, next) {
    var User = dbLayer.user;
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(user) {
        if (user) {
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
                current_business: req.body.business,
                RoleId: req.body.role,
                DepartmentId: req.body.dept
                // more info here for user
            };

            User.create(data).then(function(newUser, created) {
                if (!newUser) {
                    next({
                        success: false,
                        message: 'Error when trying to create new user'
                    });
                };
                if (newUser) {
                    next({
                        success: true,
                        message: 'User created Successfully, Pls Login'
                    });
                };
            });
        };
    });
};

module.exports = auth;
