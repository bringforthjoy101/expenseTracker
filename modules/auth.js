var bCrypt = require('bcrypt-nodejs');
var Strategy = require('passport-local').Strategy;
var dbLayer = require('../modules/dbLayer');
var models = require('../models');
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
        // function(req, email, password, cb) {
        //     dbLayer.user.findOne({
        //         where: {
        //             email: email
        //         },
        //         include: [
        //             {
        //               model: models.Role,
        //               attributes: ['id', 'role_name']
        //             },
        //             {
        //               model: models.Department,
        //               attributes: ['id', 'dept_name']
        //             },
        //             {
        //               model: models.CurrentBusiness,
        //               attributes: ['id', 'current_business_name']
        //             },
        //         ]
        //     }).then(function(user) {
        //         if (!user) {
                    
        //             return cb(null, false, { message: "No user with that email address" });
        //         }
        //         if (!isValidPassword(user.password, password)) {
        //             console.log('I am here invalid password');
        //             return cb(null, false, { message: "Password is incorrect" });
        //         }
        //         var userinfo = user.get();
        //         console.log('I am user role ' + userinfo.Role.role_name);
        //         user.update({
        //             last_login: Date.now()
        //         })
        //         return cb(null, userinfo);

        //     }).catch(function(err) {
        //         console.log("Error:", err);
        //         return cb(null, false);
        //     });
        // }));
        function(req, email, password, cb) {
            auth.checkCredentials( email, password, cb ); //change auth to this
        }));

    passport.serializeUser(function(user, cb) {
        
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        
        dbLayer.user.findById(id,
        {
            include: [
                {
                  model: models.Role,
                  attributes: ['id', 'role_name']
                },
                {
                  model: models.Department,
                  attributes: ['id', 'dept_name']
                },
                {
                  model: models.CurrentBusiness,
                  attributes: ['id', 'current_business_name']
                },
            ]
        }
        ).then(function(user) {
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

auth.checkCredentials = ( email, CurrentBusinessId, password, cb  ) => {
    models.user.findOne({
        where: {
            email: email,
            CurrentBusinessId: CurrentBusinessId
        }
    }).then(function(user) {
        if (!user) {
            return cb(null, false);
        }
        if (!isValidPassword(user.password, password)) {
            return cb(null, false);
        }

        var userinfo = user.get();
        user.update({
            last_login: Date.now()
        })
        return cb(null, userinfo);

    }).catch(function(err) {
        console.log("Error:", err);
        return cb(null, false);
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
                CurrentBusinessId: req.body.current_business,
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
