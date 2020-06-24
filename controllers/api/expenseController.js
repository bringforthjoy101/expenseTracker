var Expense = require('../../models/expense');
var models = require('../../models');
const { check, validationResult } = require('express-validator');
var checkParamsId = require('../../helpers/checkParams');


// Handle expense create on POST.
exports.expense_create_post = [
    
        [
        // Validation for inputs
        check('title')
        .not().isEmpty().withMessage('Expense title cannot be empty')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .matches(/^[A-Za-z\s]+$/).withMessage('Expense title must contain only Letters.'),
        check('desc')
        .isLength({ min: 3, max: 50 }).withMessage('Expense description must be between 3 and 50 characters long')
        .not().isEmpty().withMessage('Expense description cannot be empty'),
        check('amount')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .not().isEmpty().withMessage('Expense title cannot be empty')
        .isInt().withMessage('Expense amount must be numeric'),
        check('type')
        .not().isEmpty().withMessage('Type cannot be empty')
        .isInt().withMessage('Type must be numeric'),
        check('category')
        .not().isEmpty().withMessage('Category cannot be empty')
        .isInt().withMessage('Category must be numeric'),
        check('employee_id')
        .not().isEmpty().withMessage('Employee ID cannot be empty')
        .isInt().withMessage('Employee ID must be numeric'),
        check('department')
        .not().isEmpty().withMessage('Department cannot be empty')
        .isInt().withMessage('Department must be numeric'),
        check('current_business')
        .not().isEmpty().withMessage('Current business cannot be empty')
        .isLength({ min: 3, max: 50 }).withMessage('Current business must be between 3 and 50 characters long')
        ],
        
      
    async function(req, res, next) {
        // checks for validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        
        try {

            // var status = getStatus(req.body.amount);
            // put default pending in model
            var status;
            status = (req.body.amount <= 1000) ? 'Approved' : 'Pending';
            
            let employee_id = req.body.employee_id;
        
            const employee = await models.user.findById(employee_id);
            
            // If the category selected in the front end does not exist in DB return 400 error	
            if (!employee) {
                return res.status(400).json({
                    status: false,
                    message: 'Employee does not exist'
                });
            }
        
            var expense = {
                title: req.body.title,
                desc: req.body.desc,
                amount: req.body.amount,
                TypeId: req.body.type,
                CategoryId: req.body.category,
                status: status,
                busines_name: req.body.current_business,
                userId: employee_id,
                DepartmentId: req.body.department
            }
            
            models.Expense.create(expense).then(function(expense) {
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
exports.expense_delete_post = async function(req, res, next) {
    // validates if the department ID is an integer
    var expense_id = await checkParamsId(req, res, 'Expense', req.params.expense_id);
    
    // Performs operation
    try {
        
      // checks if the ID exists
      var thisExpense = expense_id ? await models.Expense.findById(expense_id) : null
      
      if (!thisExpense) {
        return res.status(400).json({
            status: false,
            message: 'Expense ID not found'
          });
      }
        models.Expense.destroy({
            where: {
              id: expense_id
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
        .matches(/^[A-Za-z\s]+$/).withMessage('Expense title must contain only Letters.')
        .optional({checkFalsy:true}),
        check('desc')
        .isLength({ min: 3, max: 50 }).withMessage('Expense description must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense description cannot be empty')
        .optional({checkFalsy:true}),
        check('amount')
        .isLength({ min: 3, max: 50 }).withMessage('Expense title must be between 3 and 50 characters long')
        .isEmpty().withMessage('Expense title cannot be empty')
        .isNumeric().withMessage('Express amount must be numeric')
        .optional({checkFalsy:true}),
        check('type')
        .isEmpty().withMessage('Type cannot be empty')
        .isNumeric().withMessage('Type must be numeric')
        .optional({checkFalsy:true}),
        check('category')
        .isEmpty().withMessage('Category cannot be empty')
        .isNumeric().withMessage('Category must be numeric')
        .optional({checkFalsy:true}),
      ],
    async function(req, res, next) {
        // checks for validations
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        // validates if the params ID is an integer
        var expense_id = await checkParamsId(req, res, 'Expense', req.params.expense_id);
        // Performs operation
        try {
        // checks if the ID exists
        var thisExpense = expense_id ? await models.Expense.findById(expense_id) : null
        if (!thisExpense) {
          return res.status(400).json({
              status: false,
              message: 'Expense ID not found'
            });
        }
        
            
        
        // var status = getStatus(req.body.amount);
        var status;
            
        status = (req.body.amount <= 1000) ? 'Approved' : 'Pending';
        
        var expense = {
            title: req.body.title ? req.body.title : thisExpense.title,
            desc: req.body.desc ? req.body.desc : thisExpense.desc,
            amount: req.body.amount ? req.body.amount : thisExpense.amount,
            TypeId: req.body.type ? req.body.type : thisExpense.type,
            CategoryId: req.body.category ? req.body.category : thisExpense.category,
            status: status ? status : thisExpense.status,
        }
        
        models.Expense.update(
            expense,
            { where: {id: expense_id} } 
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
exports.expense_detail = async function(req, res, next) {
    // validates if the params ID is an integer
    var expense_id = await checkParamsId(req, res, 'Expense', req.params.expense_id);
    // Performs operation
    try {
        // checks if the ID exists
        var thisExpense = expense_id ? await models.Expense.findById(expense_id) : null
        if (!thisExpense) {
          return res.status(400).json({
              status: false,
              message: 'Expense ID not found'
            });
        }
    
        models.Expense.findById(
            expense_id,
            {
                include: [
                    {
                      model: models.user,
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
                  model: models.user,
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
        const employees = await models.user.findAll();
        const totalSum = await models.Expense.sum('amount', { where: { status: 'Approved' } } );
            
        models.Expense.findAll({
            include: [
                {
                    model: models.user,
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
                expenseCount: expenses.length, 
                employeeCount: employees.length, 
                totalSum: totalSum,
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
exports.expense_approval_get = async function(req, res) {
    // validates if the params ID is an integer
    var expense_id = await checkParamsId(req, res, 'Expense', req.params.expense_id);
    var status_code = await checkParamsId(req, res, 'Status Code', req.params.status_code);
    
    console.log("The status_code is not null " + status_code);
        console.log("The expense id is not null " + expense_id);
    
    // Performs operation
    try {
        // checks if the ID exists
        var thisExpense = expense_id ? await models.Expense.findById(expense_id) : null
        if (!thisExpense) {
          return res.status(400).json({
              status: false,
              message: 'Expense ID not found'
            });
        }
        // let status = getAprovalStatus(req.params.status_code)
        
        var status = (status_code == 1) ? 'Approved' : (status_code == 2) ? 'Declined' : null;
            // if (req.params.status_code == 1) {
            //     status = 'Approved';
            // } else if (req.params.status_code == 2) {
            //     status = 'Declined';
            // } else {
            //     res.status(200).json({
            //         status: true,
            //         message: 'invalid status code'
            //     })
            // }
            
            if (!status) {
              return res.status(400).json({
                  status: false,
                  message: 'Unidentified status code'
                });
            }
                
        console.log("The status_code is not null " + status_code);
        console.log("The expense id is not null " + expense_id);
        models.Expense.update(
            // Values to update
            {
                status: status

            }, { // Clause
                where: {
                    id: expense_id
                }
            }
            //   returning: true, where: {id: req.params.scheduleId} 
        ).then(function() {
            var message = "Operation Successful"
            res.status(200).json({
                status: true,
                message: message
            })
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
    // if (amount <= 1000) {
    //     return status = 'Approved';
    // } else {
    //     return status = 'Pending';
    // }
    // return status = (amount <= 1000) ? 'Approved' : 'Pending';
}