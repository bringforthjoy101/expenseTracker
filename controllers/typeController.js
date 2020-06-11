var Type = require('../models/type');
var models = require('../models');


// Display TYPE create form on GET.
exports.type_create_get = function(req, res, next) {
        // create type GET controller logic here 
        res.render('forms/type_form', { title: 'Create Type',  layout: 'layouts/detail'});
};

// Handle type create on POST.
exports.type_create_post = function(req, res, next) {
     models.Type.create({
            type_name: req.body.type_name
        }).then(function(type) {
            console.log("Type created successfully");
           // check if there was an error during post creation
            res.redirect('/expense/types');
      });
   
};

// Display type delete form on GET.
exports.type_delete_get = function(req, res, next) {
       models.Type.destroy({
            // find the type_id to delete from database
            where: {
              id: req.params.type_id
            }
          }).then(function(type) {
           // If an type gets deleted successfully, we just redirect to comments list
           // no need to render a page
            res.redirect('/expense/types');
            console.log("Type deleted successfully");
          });
};

// Handle type delete on POST.
exports.type_delete_post = function(req, res, next) {
         models.Type.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.type_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/expense/types');
            console.log("Type deleted successfully");
          });
};

// Display type update form on GET.
exports.type_update_get = function(req, res, next) {
         // Find the post you want to update
        console.log("ID is " + req.params.type_id);
        models.Type.findById(
                req.params.type_id
        ).then(function(type) {
               // renders a type form
               res.render('forms/type_form', { title: 'Update Type', type: type, layout: 'layouts/detail'});
               console.log("Type update get successful");
          });
};

// Handle type update on POST.
exports.type_update_post = function(req, res, next) {
       console.log("ID is " + req.params.type_id);
        models.Type.update(
        // Values to update
            {
            type_name: req.body.type_name
            },
          { // Clause
                where: 
                {
                    id: req.params.type_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an type gets updated successfully, we just redirect to types list
                // no need to render a page
                res.redirect("/expense/types");  
                console.log("Type updated successfully");
          });
};

// Display list of all types.
exports.type_list = function(req, res, next) {
          // controller logic to display all comments
        models.Type.findAll(
        ).then(function(types) {
        // renders a post list page
        console.log("rendering type list");
        res.render('pages/type_list', { title: 'Type List', types: types, layout: 'layouts/list'} );
        console.log("Types list renders successfully");
        });
};

// Display detail page for a specific type.
exports.type_detail = function(req, res, next) {
     // find a comment by the primary key Pk
        models.Type.findById(
                req.params.type_id
        ).then(function(type) {
        // renders an inividual type details page
        res.render('pages/type_detail', { title: 'Type Details', type: type, layout: 'layouts/detail'} );
        console.log("Type detials renders successfully");
        });
};

 