var Category = require('../../models/category');
var models = require('../../models');
const { check, validationResult } = require('express-validator');

// Handle category create on POST.
exports.category_create_post = [
    [
      // Validation for inputs
      check('category_name')
      .isLength({ min: 3, max: 50 }).withMessage('Category name must be between 3 and 50 characters long')
      .isEmpty().withMessage('Category name cannot be empty')
      .matches(/^[A-Za-z\s]+$/).withMessage('Category name must contain only Letters.')
    ],
    function(req, res, next) {
        // checks for validations
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        // Performs operation
        try {
            models.Category.create({
            category_name: req.body.category_name
            }).then(function(category) {
              res.json({
                status: true,
                data: category,
                message: 'Category created successfully'
              })
          });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `There was an error - ${error}`
            });
        }
   
}    
];

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
    // Validates if the department ID is an integer.
    if (isNaN(Number(req.params.department_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Department ID'
        });
    }
    // Performs operation.
    try {
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If an category gets deleted successfully, we just redirect to posts list
           // no need to render a page
           res.status(200).json({
            status: true,
            message: 'Category deleted successfully'
          })
            console.log("Category deleted successfully");
          });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

// Display list of all categorys.
exports.category_list = function(req, res, next) {
        // Validates if the department ID is an integer.
        if (isNaN(Number(req.params.department_id))) {
            return res.status(400).json({
              status: false,
              message: 'Invalid Department ID'
            });
        }
        // Performs operation
        try {
            models.Category.findAll(
            ).then(function(categories) {
            // renders a post list page
            if (categories.length === 0) {
              res.status(400).json({
                status: false,
                data: 'None',
                message: 'No Categories available'
              })
            } else {
              res.status(200).json({
                status: true,
                data: categories,
                message: 'categories Listed successfully'
              })
            }
            console.log("Categories list renders successfully");
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `There was an error - ${error}`
            });
        }
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
     try {
         models.Category.findById(
                req.params.category_id,
                
        ).then(function(category) {
        // renders an inividual category details page
        if (!category) {
          res.status(400).json({
              status: false,
              data: 'None',
              message: 'Category not found'
          });
          } else {
          res.status(200).json({
              status: true,
              data: category,
              message: 'Category details rendered successfully'
          });
          }
        console.log("Category detials renders successfully");
        });
     } catch (error) {
         res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
     }
        
};

 