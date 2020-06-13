
var models = require('../../models');
const { check, validationResult } = require('express-validator');




// Handle employee create on POST.
exports.employee_create_post = [
  [
      // Validation for inputs
      check('firstname')
      .isLength({ min: 3, max: 50 }).withMessage('Firstname must be between 3 and 50 characters long')
      .isEmpty().withMessage('Firstname cannot be empty')
      .matches(/^[A-Za-z\s]+$/).withMessage('Firstname must contain only Letters.'),
      check('lastname')
      .isLength({ min: 3, max: 50 }).withMessage('Lastname must be between 3 and 50 characters long')
      .isEmpty().withMessage('Lastname cannot be empty')
      .matches(/^[A-Za-z\s]+$/).withMessage('Lastname must contain only Letters.'),
      check('username')
      .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters long')
      .isEmpty().withMessage('Username cannot be empty')
      .isAlphanumeric().withMessage('Username can only be alphanumeric.'),
      check('email')
      .isEmpty().withMessage('Email cannot be empty')
      .isEmail().withMessage('Invalid Email'),
      check('password')
      .isLength({ min: 6, max: 50 }).withMessage('Password must be between 6 and 50 characters long')
      .isEmpty().withMessage('Password cannot be empty'),
      check('department')
      .isEmpty().withMessage('Department cannot be empty')
      .isNumeric().withMessage('Department must be numeric'),
      check('role')
        .isEmpty().withMessage('Role cannot be empty')
        .isNumeric().withMessage('Role must be numeric'),
    ],
    
  async function(req, res, next) {
        // checks for validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
  // create a new employee based on the fields in our employee model
  // I have create two fields, but it can be more for your model
   console.log("This is the role " + req.body.username);
     
     
     
    // var employee = {
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     DepartmentId: req.body.department,
    //     RoleId: req.body.role
    // }
       
     
      models.Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        DepartmentId: req.body.department,
        RoleId: req.body.role
        }).then(function(employee){
          res.json({
            status: true,
            data: employee,
            message: 'Employee created successfully'
          })
        console.log("Employee created successfully");
      });
  
  
  }
];



// Handle employee delete on POST.
exports.employee_delete_post = async function(req, res, next) {
  var employee_id = req.params.employee_id
          // validates if the ID is an integer
    if (isNaN(Number(employee_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Employee ID'
        });
    }
    // checks if the ID exists
    const thisEmployee = await models.Employee.findById(employee_id)
    if (!thisEmployee) {
      return res.status(400).json({
          status: false,
          message: 'Employee ID not found'
        });
    }
    // Performs Operation
    try {
      models.Employee.destroy({
        // find the author_id to delete from database
        where: {
          id: employee_id
        }
      }).then(function() {
        res.status(200).json({
          status: true,
          message: 'Employee deleted successfully'
        })
         console.log("Employee deleted successfully");
      
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: `There was an error - ${error}`
      });
    }
};


// Handle post update on POST.
exports.employee_update_post = async function(req, res, next) {
  var employee_id = req.params.employee_id
       console.log("ID is " + employee_id);
       // validates if the ID is an integer
       if (isNaN(Number(employee_id))) {
          return res.status(400).json({
            status: false,
            message: 'Invalid Employee ID'
          });
        }
        // checks if the ID exists
        const thisEmployee = await models.Employee.findById(employee_id)
        if (!thisEmployee) {
          return res.status(400).json({
              status: false,
              message: 'Employee ID not found'
            });
        }

        try {
          var employee = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          }
          models.Employee.update(
            // Values to update
                {
                    employee
                },
              { // Clause
                    where: 
                    {
                        id: employee_id
                    }
                }
            //   returning: true, where: {id: req.params.post_id} 
             ).then(function(employee) {
              res.status(200).json({
                status: true,
                data: employee,
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
        
};

// Display list of all employees.
exports.employee_list = function(req, res, next) {

        try {
          models.Employee.findAll({
            include: [
                {
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

// Display detail page for a specific author.
exports.employee_detail = async function(req, res, next) {
  var employee_id = req.params.employee_id
  // validates if the ID is an integer
  if (isNaN(Number(employee_id))) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Employee ID'
    });
  }
  // checks if the ID exists
    const thisEmployee = await models.Employee.findById(employee_id)
    if (!thisEmployee) {
      return res.status(400).json({
          status: false,
          message: 'Employee ID not found'
        });
    }

  try {
    console.log("This is the employee id " + employee_id);
    // console.log("This is the employee department " + req.params.employee_department);
    // Listing all expenses created by an employee
    const expenses = await models.Expense.findAll({
      include: [
        {
          model: models.Employee,
          attributes: ['id', 'firstname', 'lastname','DepartmentId']
        },
      ],
        where: {
          EmployeeId: employee_id,
        },
    });

    // Listing all expenses created by all employees
    // const deptExpenses = await models.Expense.findAll({
    //   where: {
    //     DepartmentId: req.params.employee_department,
    //   },
    // });

    

    const allExpenses = await models.Expense.findAll({
      include: [
        {
          model: models.Employee,
          attributes: ['id', 'first_name', 'last_name']
        },
      ]
    });

    const employeeExpenses = await  models.Expense.findAndCountAll({
      where: {EmployeeId: employee_id}
    });

    const employeeTotalExpenses = await models.Expense.sum('amount', {where: {EmployeeId: employee_id} });
    const categories = await models.Category.findAll();
    const types = await models.Type.findAll();
    const departments = await models.Department.findAll();
    const roles =  await models.Role.findAll();
    const employees =  await models.Employee.findAll({
      include: [
        {
          model: models.Department,
          attributes: ['id', 'dept_name']
        },
        {
          model: models.Role,
          attributes: ['id', 'role_name']
        }
      ]
    });

    console.log("This is the expenses for that employed id " + employee_id);
    // console.log("This is the expenses for that employee dept " + req.params.employee_department);

     models.Employee.findById(
      employee_id, 
      {
          include: [
            {
              model: models.Expense,
              // attributes: [ 'title', 'desc','amount','category','status','EmployeeId','createdAt','department' ],
                  
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
      // console.log("This is employee expense " + employee.expenses.length);
      // renders an inividual post details page
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
            employees:employees, 
            expenses: expenses,
            departments: departments,
            roles: roles, 
            // deptExpenses: deptExpenses,
            allExpenses: allExpenses,
            employeeTotalExpenses: employeeTotalExpenses,
            employeeExpenses: employeeExpenses,
            categories: categories,
            types: types,
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

