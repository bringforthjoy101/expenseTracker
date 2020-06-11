var Category = require('../models/category');
var models = require('../models');
// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
        // create category GET controller logic here 
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
     models.Category.create({
            name: req.body.name
        }).then(function() {
            console.log("Category created successfully");
           // check if there was an error during post creation
            res.redirect('/expense/categories');
      });
   
};

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
            res.redirect('/expense/categories');
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
            res.redirect('/expense/categories');
            console.log("Category deleted successfully");
          });
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
         // Find the post you want to update
        console.log("ID is " + req.params.category_id);
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               // renders a post form
               res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail'});
               console.log("Category update get successful");
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
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to categoriess list
                // no need to render a page
                res.redirect("/expense/categories");  
                console.log("Category updated successfully");
          });
};

// Display list of all categorys.
exports.category_list = function(req, res, next) {
          // controller logic to display all categories
        models.Category.findAll(
        ).then(function(categories) {
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/category_list', { title: 'Category List', categories: categories, layout: 'layouts/list'} );
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
        res.render('pages/category_detail', { title: 'Category Details', category: category, layout: 'layouts/detail'} );
        console.log("Category detials renders successfully");
        });
};

 