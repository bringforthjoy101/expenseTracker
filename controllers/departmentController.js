var Department = require('../models/department');
var models = require('../models');


// Display DEPARTMENT create form on GET.
exports.department_create_get = function(req, res, next) {
        // create department GET controller logic here 
        res.render('forms/department_form', { title: 'Create Department',  layout: 'layouts/detail'});
};

// Handle department create on POST.
exports.department_create_post = function(req, res, next) {
     models.Department.create({
            dept_name: req.body.dept_name
        }).then(function(department) {
            console.log("Department created successfully");
           // check if there was an error during post creation
            res.redirect('/expense/departments');
      });
   
};

// Display department delete form on GET.
exports.department_delete_get = function(req, res, next) {
       models.Department.destroy({
            // find the department_id to delete from database
            where: {
              id: req.params.department_id
            }
          }).then(function(department) {
           // If an department gets deleted successfully, we just redirect to comments list
           // no need to render a page
            res.redirect('/expense/departments');
            console.log("Department deleted successfully");
          });
};

// Handle department delete on POST.
exports.department_delete_post = function(req, res, next) {
         models.Department.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.department_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/expense/departments');
            console.log("Department deleted successfully");
          });
};

// Display department update form on GET.
exports.department_update_get = function(req, res, next) {
         // Find the post you want to update
        console.log("ID is " + req.params.department_id);
        models.Department.findById(
                req.params.department_id
        ).then(function(department) {
               // renders a department form
               res.render('forms/department_form', { title: 'Update Department', department: department, layout: 'layouts/detail'});
               console.log("Department update get successful");
          });
};

// Handle department update on POST.
exports.department_update_post = function(req, res, next) {
       console.log("ID is " + req.params.department_id);
        models.Department.update(
        // Values to update
            {
            dept_name: req.body.dept_name
            },
          { // Clause
                where: 
                {
                    id: req.params.department_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an department gets updated successfully, we just redirect to departments list
                // no need to render a page
                res.redirect("/expense/departments");  
                console.log("Department updated successfully");
          });
};

// Display list of all departments.
exports.department_list = function(req, res, next) {
          // controller logic to display all comments
        models.Department.findAll(
        ).then(function(departments) {
        // renders a post list page
        console.log("rendering department list");
        res.render('pages/department_list', { title: 'Department List', departments: departments, layout: 'layouts/list'} );
        console.log("Departments list renders successfully");
        });
};

// Display detail page for a specific department.
exports.department_detail = function(req, res, next) {
     // find a comment by the primary key Pk
        models.Department.findById(
                req.params.department_id
        ).then(function(department) {
        // renders an inividual department details page
        res.render('pages/department_detail', { title: 'Department Details', department: department, layout: 'layouts/detail'} );
        console.log("Department detials renders successfully");
        });
};

 