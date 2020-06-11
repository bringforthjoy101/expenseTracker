var Role = require('../models/role');
var models = require('../models');


// Display Role create form on GET.
exports.role_create_get = function(req, res, next) {
        // create role GET controller logic here 
        res.render('forms/role_form', { title: 'Create Role',  layout: 'layouts/detail'});
};

// Handle role create on POST.
exports.role_create_post = function(req, res, next) {
  let status = 'open';
     models.Role.create({
            role_name: req.body.role_name,
            status: status
        }).then(function(role) {
            console.log("Role created successfully");
           // check if there was an error during post creation
            res.redirect('/expense/roles');
      });
   
};

// Display role delete form on GET.
exports.role_delete_get = function(req, res, next) {
       models.Role.destroy({
            // find the role_id to delete from database
            where: {
              id: req.params.role_id
            }
          }).then(function(role) {
           // If an role gets deleted successfully, we just redirect to comments list
           // no need to render a page
            res.redirect('/expense/roles');
            console.log("Role deleted successfully");
          });
};

// Handle role delete on POST.
exports.role_delete_post = function(req, res, next) {
         models.Role.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.role_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/expense/roles');
            console.log("Role deleted successfully");
          });
};

// Display role update form on GET.
exports.role_update_get = function(req, res, next) {
         // Find the post you want to update
        console.log("ID is " + req.params.role_id);
        models.Role.findById(
                req.params.role_id
        ).then(function(role) {
               // renders a role form
               res.render('forms/role_form', { title: 'Update Role', role: role, layout: 'layouts/detail'});
               console.log("Role update get successful");
          });
};

// Handle role update on POST.
exports.role_update_post = function(req, res, next) {
       console.log("ID is " + req.params.role_id);
        models.Role.update(
        // Values to update
            {
            role_name: req.body.role_name
            },
          { // Clause
                where: 
                {
                    id: req.params.role_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an role gets updated successfully, we just redirect to roles list
                // no need to render a page
                res.redirect("/expense/roles");  
                console.log("Role updated successfully");
          });
};

// Display list of all roles.
exports.role_list = function(req, res, next) {
          // controller logic to display all comments
        models.Role.findAll(
        ).then(function(roles) {
        // renders a post list page
        console.log("rendering role list");
        res.render('pages/role_list', { title: 'Role List', roles: roles, layout: 'layouts/list'} );
        console.log("Roles list renders successfully");
        });
};

// Display detail page for a specific role.
exports.role_detail = function(req, res, next) {
     // find a comment by the primary key Pk
        models.Role.findById(
                req.params.role_id
        ).then(function(role) {
        // renders an inividual role details page
        res.render('pages/role_detail', { title: 'Role Details', role: role, layout: 'layouts/detail'} );
        console.log("Role detials renders successfully");
        });
};

 