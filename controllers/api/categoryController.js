var Category = require('../../models/category');
var models = require('../../models');
const { check, validationResult } = require('express-validator');

// Handle category create on POST.
exports.category_create_post = [
    [
      // Validation for inputs
      check('dept_name')
      .isLength({ min: 3, max: 50 }).withMessage('Department name must be between 3 and 50 characters long')
      .isEmpty().withMessage('Department name cannot be empty')
      .matches(/^[A-Za-z\s]+$/).withMessage('Department name must contain only Letters.')
    ],
    function(req, res, next) {
     models.Category.create({
            name: req.body.name
        }).then(function(category) {
          res.json({
            status: true,
            data: category,
            message: 'Category created successfully'
          })
      });
   
}    
];

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
       models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
           res.json({
            status: true,
            message: 'Category deleted successfully'
          })
          console.log("Category deleted successfully");
          });
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
         models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If an category gets deleted successfully, we just redirect to posts list
           // no need to render a page
           res.json({
            status: true,
            message: 'Category deleted successfully'
          })
            console.log("Category deleted successfully");
          });
};

// Handle post update on POST.
exports.category_update_post = function(req, res, next) {
       console.log("ID is " + req.params.category_id);
        models.Category.update(
        // Values to update
            {
                    name: req.body.name
            },
          { // Clause
                where: 
                {
                    id: req.params.category_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function(category) { 
                // If an post gets updated successfully, we just redirect to categoriess list
                // no need to render a page
                res.json({
                  status: true,
                  data: category,
                  message: 'Category updated successfully'
                })
                console.log("Category updated successfully");
          });
};

// Display list of all categorys.
exports.category_list = function(req, res, next) {
          // controller logic to display all categories
        models.Category.findAll(
        ).then(function(categories) {
        // renders a post list page
        if (categories.length === 0) {
          res.json({
            status: false,
            data: 'None',
            message: 'No Categories available'
          })
        } else {
          res.json({
            status: true,
            data: categories,
            message: 'categories Listed successfully'
          })
        }
        console.log("Categories list renders successfully");
        });
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
     // find a post by the primary key Pk
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
          res.json({
              status: true,
              data: category,
              message: 'Category details rendered successfully'
          });
          }
        console.log("Category detials renders successfully");
        });
};

 