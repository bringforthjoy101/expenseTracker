var Employee = require('../../models/user');
var models = require('../../models');
const { check, validationResult } = require('express-validator');
var checkParamsId = require('../../helpers/checkParams');

// CREATE EMPLOYEE.
exports.employee_create_post = [
    [
        // Validation for inputs
        check('firstname')
        .isLength({
            min: 3,
            max: 50
        }).withMessage('Firstname must be between 3 and 50 characters long')
        .not().isEmpty().withMessage('Firstname cannot be empty')
        .matches(/^[A-Za-z\s]+$/).withMessage('Firstname must contain only Letters.'),
        check('lastname')
        .isLength({
            min: 3,
            max: 50
        }).withMessage('Lastname must be between 3 and 50 characters long')
        .not().isEmpty().withMessage('Lastname cannot be empty')
        .matches(/^[A-Za-z\s]+$/).withMessage('Lastname must contain only Letters.'),
        check('username')
        .isLength({
            min: 3,
            max: 50
        }).withMessage('Username must be between 3 and 50 characters long')
        .not().isEmpty().withMessage('Username cannot be empty')
        .isAlphanumeric().withMessage('Username can only be alphanumeric.'),
        check('email')
        .not().isEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Invalid Email'),
        check('password')
        .isLength({
            min: 6,
            max: 50
        }).withMessage('Password must be between 6 and 50 characters long')
        .not().isEmpty().withMessage('Password cannot be empty'),
        check('department')
        .not().isEmpty().withMessage('Department cannot be empty')
        .isInt().withMessage('Department must be numeric'),
        check('role')
        .not().isEmpty().withMessage('Role cannot be empty')
        .isInt().withMessage('Role must be numeric'),
    ],

    function(req, res, next) {
        // checks for validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }
        // create a new employee based on the fields in our employee model
        // I have create two fields, but it can be more for your model
        console.log("This is the user " + req.body.username);


        try {
            var employee = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                DepartmentId: req.body.department,
                RoleId: req.body.role
            }


            models.user.create(employee).then(function(employee) {
                res.status(200).json({
                    status: true,
                    data: employee,
                    message: 'Employee created successfully'
                })
                console.log("Employee created successfully");
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `There was an error - ${error}`
            });
        }
    }

];

// DELETE EMPLOYEE.
exports.employee_delete_post = async function(req, res, next) {
    // validates if the ID is an integer
    var employee_id = await checkParamsId(req, res, 'Employee', req.params.employee_id);
    try {

        var thisEmployee = employee_id ? await models.user.findById(employee_id) : null
        // checks if the ID exists

        if (!thisEmployee) {
            return res.status(400).json({
                status: false,
                message: 'Employee ID not found'
            });
        }
        
        // checks if the user is a manager and belongs to this employee's department
        if (thisEmployee.DepartmentId == req.user.DepartmentId && req.user.Role.role_name == 'Manager') {
            models.user.destroy({
                thisEmployee,
                where: {
                    id: employee_id
                }
            }).then(function() {
                res.status(200).json({
                    status: true,
                    message: 'Employee deleted successfully'
                })
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

// UPDATE EMPLOYEE
exports.employee_update_post = [

    [
        // Validation for inputs
        check('firstname')
        .isLength({
            min: 3,
            max: 50
        }).withMessage('Firstname must be between 3 and 50 characters long')
        .matches(/^[A-Za-z\s]+$/).withMessage('Firstname must contain only Letters.')
        .optional({
            checkFalsy: true
        }),
        check('lastname')
        .isLength({
            min: 3,
            max: 50
        }).withMessage('Lastname must be between 3 and 50 characters long')
        .matches(/^[A-Za-z\s]+$/).withMessage('Lastname must contain only Letters.')
        .optional({
            checkFalsy: true
        }),
        check('username')
        .isLength({
            min: 6,
            max: 50
        }).withMessage('Username must be between 6 and 50 characters long')
        .isAlphanumeric().withMessage('Username can only be alphanumeric.')
        .optional({
            checkFalsy: true
        }),
        check('email')
        .isEmail().withMessage('Invalid Email')
        .optional({
            checkFalsy: true
        }),
        check('password')
        .isLength({
            min: 6,
            max: 50
        }).withMessage('Password must be between 6 and 50 characters long')
        .optional({
            checkFalsy: true
        }),
        check('department')
        .isInt().withMessage('Department must be numeric')
        .optional({
            checkFalsy: true
        }),
        check('role')
        .isInt().withMessage('Role must be numeric')
        .optional({
            checkFalsy: true
        }),
    ],


    async function(req, res, next) {
        // checks for validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }

        // validates if the ID is an integer
        var employee_id = await checkParamsId(req, res, 'Employee', req.user.id);

        try {

            var thisEmployee = employee_id ? await models.user.findById(employee_id) : null
            console.log('Old employee firstname ' + thisEmployee.firstname);

            if (!thisEmployee) {
                return res.status(400).json({
                    status: false,
                    message: 'Employee ID not found'
                });
            }

            var employee = {
                firstname: req.body.firstname ? req.body.firstname : thisEmployee.firstname,
                lastname: req.body.lastname ? req.body.lastname : thisEmployee.lastname,
                username: req.body.username ? req.body.username : thisEmployee.username,
                email: req.body.email ? req.body.email : thisEmployee.email,
                password: req.body.password ? req.body.password : thisEmployee.password,
                DepartmentId: req.body.department ? req.body.department : thisEmployee.DepartmentId,
                RoleId: req.body.role ? req.body.role : thisEmployee.RoleId
            }

            console.log('This is the employee ' + employee);

            console.log('New Employee firstname ' + employee.firstname);

            console.log('This is employee id ' + employee_id);

            models.user.update(
                employee, {
                    where: {
                        id: employee_id
                    }
                }
            ).then(function(data) {
                res.status(200).json({
                    status: true,
                    data: data,
                    message: 'Employee updated successfully'
                })
                console.log("Employee updated successfully");
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `There was an error - ${error}`
            });
        }
    }
];

// LIST ALL EMPLOYEES.
exports.employee_list = function(req, res, next) {

    try {
        models.user.findAll({
            where: {
                CurrentBusinessId: req.user.CurrentBusinessId
            },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: models.Department,
                    attributes: ['id', 'dept_name']
                },
                {
                    model: models.Role,
                    attributes: ['id', 'role_name']
                }
            ]
        }).then(function(employees) {

            console.log("rendering employee list");
            if (employees.length === 0) {
                res.status(400).json({
                    status: false,
                    data: employees,
                    message: 'No Employee available'
                })
            } else {
                res.status(400).json({
                    status: true,
                    data: employees,
                    message: 'Employees Listed successfully'
                })
            }

            console.log("Employees list renders successfully");
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }

};

// LIST MANAGERS IN A CURRENT BUSINESS
exports.manager_list = async function(req, res, next) {

    try {
        // find all roles with "Manager" that belongs to a particular current business.
        const manager = await models.Role.findAll({
            where: {
                CurrentBusinessId: req.user.CurrentBusinessId,
                role_name: 'Manager'
            },
        });

        console.log('this is the manager role id ' + manager[0].id);

        // find all users in a particular current business belonging to the role "Manager". 
        models.user.findAll({
            where: {
                CurrentBusinessId: req.user.CurrentBusinessId,
                DepartmentId: req.user.DepartmentId,
                RoleId: manager[0].id
            },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: models.Department,
                    attributes: ['id', 'dept_name']
                },
                {
                    model: models.Role,
                    attributes: ['id', 'role_name']
                }
            ]
        }).then(function(managers) {

            console.log("rendering employee list");
            if (managers.length === 0) {
                res.status(400).json({
                    status: false,
                    data: managers,
                    message: 'No Manager available'
                })
            } else {
                res.status(400).json({
                    status: true,
                    data: managers,
                    message: 'Managers Listed successfully'
                })
            }

            console.log("Managers list renders successfully");
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }


};

// READ ONE EMPLOYEE.
exports.employee_detail = async function(req, res, next) {

    var employee = await checkParamsId(req, res, 'Employee', req.params.employee_id, true);

    var employee_id = await checkParamsId(req, res, 'Employee', req.params.employee_id);

    try {

        var thisEmployee = employee_id ? await models.user.findById(employee_id) : null

        if (!thisEmployee) {
            return res.status(400).json({
                status: false,
                message: 'Employee ID not found'
            });
        }

        console.log('This is the employee ' + thisEmployee);

        console.log("This is the employee id " + employee_id);


        const employeeTotalExpenses = await models.Expense.sum('amount', {
            where: {
                userId: employee_id,
                status: 'Approved'
            }
        });


        console.log("This is the expenses for that employed id " + employee_id);

        models.user.findById(
            employee_id, {
                include: [{
                        model: models.Expense,
                    },
                    {
                        model: models.Department,
                        attributes: ['id', 'dept_name']
                    },
                    {
                        model: models.Role,
                        attributes: ['id', 'role_name']
                    }
                ]
            }
        ).then(function(employee) {
            if (!employee) {
                res.status(400).json({
                    status: false,
                    data: 'None',
                    message: 'Employee not found'
                });
            } else {
                res.status(200).json({
                    status: true,
                    data: employee,
                    employeeTotalExpenses: employeeTotalExpenses,
                    message: 'Employee details rendered successfully'
                });
            }
            console.log("Employee detials renders successfully");
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

