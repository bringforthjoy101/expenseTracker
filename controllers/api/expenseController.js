var Expense = require('../../models/expense');
var models = require('../../models');
const { check, validationResult } = require('express-validator');


// Handle expense create on POST.
exports.expense_create_post = [
    [
        // Validation for inputs
        check('title')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense title cannot be empty')
        .matches(/^[A-Za-z\s]+$/).withMessage('Expense title must contain only Letters.'),
        check('desc')
        .isLength({ min: 3, max: 50 }).withMessage('Expense description must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense description cannot be empty'),
        check('amount')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense title cannot be empty')
        .isNumeric().withMessage('Express amount must be numeric'),
        check('type')
        .isEmpty().withMessage('Type cannot be empty')
        .isNumeric().withMessage('Type must be numeric'),
        check('category')
        .isEmpty().withMessage('Category cannot be empty')
        .isNumeric().withMessage('Category must be numeric'),
        check('employee_id')
        .isEmpty().withMessage('Employee ID cannot be empty')
        .isNumeric().withMessage('Employee ID must be numeric'),
        check('department')
        .isEmpty().withMessage('Department cannot be empty')
        .isNumeric().withMessage('Department must be numeric'),
        check('current_business')
        .isLength({ min: 3, max: 50 }).withMessage('Current business must be between 3 and 50 characters long')
        .isEmpty().withMessage('Current business cannot be empty')
        
      ],
    async function(req, res, next) {
        // checks for validations
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        try {

            var status = getStatus(req.body.amount);
            // put default pending in model
            
            
            let employee_id = req.body.employee_id;
        
            const employee = await models.Employee.findById(employee_id);
            
            // If the category selected in the front end does not exist in DB return 400 error	
            if (!employee) {
                return res.status(400).json({
                    // error msg here
                });
            }
        
            // var expense = {
            //     title: req.body.title,
            //     desc: req.body.desc,
            //     amount: req.body.amount,
            //     TypeId: req.body.type,
            //     CategoryId: req.body.category,
            //     status: status,
            //     busines_name: req.body.current_business,
            //     EmployeeId: employee_id,
            //     DepartmentId: req.body.department
            // }
            
            models.Expense.create({
                title: req.body.title,
                desc: req.body.desc,
                amount: req.body.amount,
                TypeId: req.body.type,
                CategoryId: req.body.category,
                status: status,
                busines_name: req.body.current_business,
                EmployeeId: employee_id,
                DepartmentId: req.body.department
            }).then(function(expense) {
                res.status(200).json({
                    status: true,
                    data: expense,
                    message: 'Expense created successfully'
                })
                console.log("Expense created successfully");
        });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `There was an error - ${error}`
            });
        }
        
    }
];

// Handle post delete on POST.
exports.expense_delete_post = function(req, res, next) {
    // validates if the department ID is an integer
    if (isNaN(Number(req.params.expense_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Department ID'
        });
    }
    // Performs operation
    try {
        models.Expense.destroy({
            where: {
              id: req.params.expense_id
            }
          }).then(function() {
            res.status(200).josn({
                status: true,
                message: 'Expense Deleted Successfully'
            })
            console.log("Expense deleted successfully");
          });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
 };

// Handle expense update on POST.
exports.expense_update_post = [
    [
        // Validation for inputs
        check('title')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense title cannot be empty')
        .matches(/^[A-Za-z\s]+$/).withMessage('Expense title must contain only Letters.'),
        check('desc')
        .isLength({ min: 3, max: 50 }).withMessage('Expense description must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense description cannot be empty'),
        check('amount')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense title cannot be empty')
        .isNumeric().withMessage('Express amount must be numeric'),
        check('type')
        .isEmpty().withMessage('Type cannot be empty')
        .isNumeric().withMessage('Type must be numeric'),
        check('category')
        .isEmpty().withMessage('Category cannot be empty')
        .isNumeric().withMessage('Category must be numeric'),
      ],
    async function(req, res, next) {
        // checks for validations
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        // Performs operation
        try {
            console.log("ID is " + req.params.expense_id);
        
        var status = getStatus(req.body.amount);
        let employee_id = req.body.employee_id;
        // create a new post based on the fields in our post model
        // I have create two fields, but it can be more for your model
         
        // I queried the database to make sure the employee selected exist in DB
        const employee = await models.Employee.findById(employee_id);
        
        // If the category selected in the front end does not exist in DB return 400 error	
        if (!employee) {
            return res.status(400);
        }
        var expense = {
            title: req.body.title,
            desc: req.body.desc,
            amount: req.body.amount,
            TypeId: req.body.type,
            CategoryId: req.body.category,
            status: status,
        }
        models.Expense.update(
            {
                expense
            },
          { // Clause
                where: 
                {
                    id: req.params.expense_id
                }
            }
        //   returning: true, where: {id: req.params.expense_id} 
         ).then(function(expense) { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.status(200).json({
                    status: true,
                    data: expense,
                    message: 'Expense updated successfully'
                  }) 
                console.log("Expense updated successfully");
          });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `There was an error - ${error}`
            });
        }
        
    }
];

// Display detail page for a specific expense.
exports.expense_detail = function(req, res, next) {
    // validates if the department ID is an integer
    if (isNaN(Number(req.params.expense_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Expense ID'
        });
    }
    // Performs operation
    try {
        models.Expense.findById(
            req.params.expense_id,
            {
                include: [
                    {
                      model: models.Employee,
                      attributes: ['id', 'firstname', 'lastname']
                    },
                    {
                        model: models.Category,
                        attributes: ['id', 'category_name']
                    },
                    {
                        model: models.Type,
                        attributes: ['id', 'type_name']
                    },
                    {
                        model: models.Department,
                        attributes: ['id', 'dept_name']
                    },
                ]
            }
    ).then(function(expense) {
    // renders an inividual post details page
    if (!expense) {
        res.status(400).json({
            status: false,
            data: 'None',
            message: 'Expense not found'
        });
        } else {
        res.json({
            status: true,
            data: expense,
            message: 'Expense details rendered successfully'
        });
        }
    console.log("Expense details renders successfully");
    });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
        
};




// Display list of all posts.
exports.expense_list = function(req, res, next) {
    // var user_business_name = req.params.user_busines_name;
    try {
        models.Expense.findAll({
            // where: {business_name: user_business_name},
            include: [
                {
                  model: models.Employee,
                  attributes: ['id', 'firstname', 'lastname']
                },
                {
                    model: models.Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: models.Type,
                    attributes: ['id', 'type_name']
                },
                {
                    model: models.Department,
                    attributes: ['id', 'dept_name']
                },
            ]

        }).then(function(expenses) {
        // renders a post list page
        console.log("rendering expense list");
        if (expenses.length === 0) {
            res.json({
              status: false,
              data: 'None',
              message: 'No Expense available'
            })
          } else {
            res.json({
              status: true,
              data: expenses,
              message: 'Expenses Listed successfully'
            })
          }
        
        console.log("Expenses list renders successfully");
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
        
        
};

// This is the expense homepage.
exports.index = async function(req, res) {
    try {
        const employees = await models.Employee.findAll();
        const totalSum = await models.Expense.sum('amount', { where: { status: 'Approved' } } );
            
        models.Expense.findAll({
            include: [
                {
                    model: models.Employee,
                    attributes: ['id', 'firstname', 'lastname']
                },
                {
                    model: models.Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: models.Type,
                    attributes: ['id', 'type_name']
                },
                {
                    model: models.Department,
                    attributes: ['id', 'dept_name']
                },
            ]
            }).then(function(expenses) {

            console.log("this is the total sum of expenses = " + totalSum);
        
            res.status(200).json({
                status: true,
                expenseCount: 'Total numbers of expenses = ' + expenses.length, 
                employeeCount: 'Total numbers of employees = ' + employees.length, 
                totalSum: 'Total Sum of Expenses = ' + totalSum,
                expenses: expenses
            })

        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

// Expense Approval
exports.expense_approval_get = function(req, res) {
    // validates if the department ID is an integer
    if (isNaN(Number(req.params.expense_id))) {
        return res.status(400).json({
            status: false,
            message: 'Invalid Expense ID'
        });
    }
    // Performs operation
    try {
        let expense_id = req.params.expense_id;
        let employee_id = req.params.employee_id;
        let status = getAprovalStatus(req.params.status_code)

        console.log("The employee id is not null " + employee_id);
        console.log("The expense id is not null " + expense_id);
        models.Expense.update(
            // Values to update
            {
                status

            }, { // Clause
                where: {
                    id: req.params.expense_id
                }
            }
            //   returning: true, where: {id: req.params.scheduleId} 
        ).then(function() {
            //check if employee id is present in the route
            if (employee_id) {
                var message = "Operation Successful"
                res.status(200).json({
                    status: true,
                    message: message
                })
            } else {
                var message = "Operation Failed"
                res.status(200).json({
                    status: false,
                    message: message + 'Employee Id does not exisit'
                })
            }
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

async function getAprovalStatus(id) {

    var status;
    return status = (id == 1) ? 'Approved' : (id == 2) ? 'Declined' : 'Pending';
}

async function getStatus(amount) {
    var status;
    return status = (amount <= 1000) ? 'Approved' : 'Pending';
}