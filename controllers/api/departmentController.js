var Department = require('../../models/department');
var models = require('../../models');
const { check, validationResult } = require('express-validator');


// Handle department create on POST.
exports.department_create_post = [
    [
      // Validation for inputs
      check('dept_name')
      .isLength({ min: 3, max: 50 }).withMessage('Department name must be between 3 and 50 characters long')
      .isEmpty().withMessage('Department name cannot be empty')
      .matches(/^[A-Za-z\s]+$/).withMessage('Department name must contain only Letters.')
    ],
    
    function(req, res, next) {
        
        // checks for validations
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        // Performs operation
        try {
          
            var dept_name = {dept_name: req.body.dept_name}
        
            //   performs operations
            models.Department.create({
             dept_name
            }).then(function(department) {
              res.status(200).json({
                status: true,
                data: department,
                message: 'Department created successfully'
              });
                console.log("Department created successfully");
            });
        } catch (error) {
          // check if there was an error during operation
        res.status(400).json({
          status: false,
          message: `There was an error - ${error}`
        });
        }
    } 
]; 

// Display department delete form on GET.
exports.department_delete_get = function(req, res, next) {
    // validates if the department ID is an integer
    if (isNaN(Number(req.params.department_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Department ID'
        });
    }
    // Performs operation
    try {
        models.Department.destroy({
        where: {
          id: req.params.department_id
        }
        }).then(function() {
            res.status(200).json({
                status: true,
                message: 'Department deleted successfully'
            })
            console.log("Department deleted successfully");
        });
    } catch (error) {
        res.status(400).json({
          status: false,
          message: `There was an error - ${error}`
        });
    }
};

// Handle department delete on POST.
exports.department_delete_post = function(req, res, next) {
    // Validates if the department ID is an integer.
    if (isNaN(Number(req.params.department_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Department ID'
        });
    }
    // Performs operation.
    try {
        models.Department.destroy({
        where: {
          id: req.params.department_id
        }
        }).then(function() {
            res.status(200).json({
                status: true,
                message: 'Department deleted successfully'
            })
            console.log("Department deleted successfully");
        });
    } catch (error) {
        res.status(400).json({
          status: false,
          message: `There was an error - ${error}`
        });
    }
         
};


// Display list of all departments.
exports.department_list = function(req, res, next) {
    
    try {
       models.Department.findAll(
        ).then(function(departments) {
        // renders a post list page
        if (departments.length === 0) {
          res.status(400).json({
            status: false,
            data: 'None',
            message: 'No Department available'
          })
        } else {
          res.status(200).json({
            status: true,
            data: departments,
            message: 'Departments Listed successfully'
          })
        }
        console.log("Departments list renders successfully");
        }); 
    } catch (error) {
        res.status(400).json({
          status: false,
          message: `There was an error - ${error}`
        });
    }      
        
};

// Display detail page for a specific department.
exports.department_detail = function(req, res, next) {
    // validates if the department ID is an integer.
    if (isNaN(Number(req.params.department_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Department ID'
        });
    }
    // performs operation
    try {
        models.Department.findById(
                req.params.department_id
        ).then(function(department) {
        // renders an inividual department details page
        if (!department) {
          res.status(400).json({
              status: false,
              data: 'None',
              message: 'Department not found'
          });
          } else {
          res.json({
              status: true,
              data: department,
              message: 'Department details rendered successfully'
          });
          }
        console.log("Department detials renders successfully");
        });
    } catch (error) {
        res.status(400).json({
          status: false,
          message: `There was an error - ${error}`
        });
    }
        
};

 