
var models = require('../models');
// var employee = require('./../controllers/api/employeeController');
const fetch = require('node-fetch');
const moment = require('moment');


// Handle employee create on POST.
exports.employee_create_post = async function(req, res, next) {

  // create a new employee based on the fields in our employee model
  // I have create two fields, but it can be more for your model
   console.log("This is the role " + req.body.role);
     
     let role  =  req.body.role;

     if(role == 1) {
      models.Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        DepartmentId: req.body.department,
        RoleId: role
        }).then(function(){
          models.Role.update(
            // Values to update
                {
                    status: 'taken'
                    
                },
              { // Clause
                    where: 
                    {
                        role_name: 'Manager'
                    }
                }
            //   returning: true, where: {id: req.params.scheduleId} 
             ).then(function(){
        console.log("Employee created successfully");
        // check if there was an error during post creation
        res.redirect('/expense/employees');
      });
      }); 
     } else {
      models.Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        DepartmentId: req.body.department,
        RoleId: role
        }).then(function(){
          
        console.log("Employee created successfully");
        // check if there was an error during post creation
        res.redirect('/expense/employees');
      });
     }
  
  
  };


// Handle employee delete on POST.
exports.employee_delete_get = function(req, res, next) {
          console.log("im here")
          
         models.Employee.destroy({
            // find the author_id to delete from database
            where: {
              id: req.params.employee_id
            }
          }).then(function() {

            
            models.Employee.findAndCountAll(
                { where: { RoleId : 1 } }
              ).then(function(managerCount) {
            console.log("this is count of manager " + managerCount.count);
                if (managerCount.count == 0) {
                  models.Role.update(
                    // Values to update
                        {
                            status: 'open'
                            
                        },
                      { // Clause
                            where: 
                            {
                                role_name: 'Manager'
                            }
                        }
                     );
                }
            console.log("Manager role is open")
                
            // If an post gets deleted successfully, we just redirect to posts list
            // no need to render a page
             res.redirect('/expense/employees');
             console.log("Employee deleted successfully");
          
          });
          });
        
          
};

// Handle employee delete on POST.
exports.employee_delete_post = function(req, res, next) {
  console.log("im here")
  models.Employee.destroy({
     // find the author_id to delete from database
     where: {
       id: req.params.employee_id
     }
   }).then(function() {

    models.Employee.findAndCountAll(
                { where: { RoleId : 1 } }
              ).then(function(managerCount) {
            console.log("this is count of manager " + managerCount.count);
                if (managerCount.count == 0) {
                  models.Role.update(
                    // Values to update
                        {
                            status: 'open'
                            
                        },
                      { // Clause
                            where: 
                            {
                                role_name: 'Manager'
                            }
                        }
                     );
                }
            console.log("Manager role is open")
     // If an post gets deleted successfully, we just redirect to posts list
     // no need to render a page
     res.redirect('/expense/employees');
     console.log("Employee deleted successfully");
    });
    });
};

// Display employee update form on GET.
exports.employee_update_get = function(req, res, next) {
  // Find the post you want to update
 console.log("ID is " + req.params.employee_id);
 models.Employee.findById(
         req.params.employee_id
 ).then(function(employee) {
        // renders a post form
        res.render('forms/employee_form', { title: 'Update Employee', employee: employee, layout: 'layouts/detail'});
        console.log("Employee update get successful");
   });
};

// Handle post update on POST.
exports.employee_update_post = function(req, res, next) {
       console.log("ID is " + req.params.employee_id);
        models.Employee.update(
        // Values to update
            {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    RoleId: req.body.role,
                    DepartmentId: req.body.department
            },
          { // Clause
                where: 
                {
                    id: req.params.employee_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() {
           
          models.Employee.findAndCountAll(
            { where: { RoleId : 1 } }
          ).then(function(managerCount) {
        console.log("this is count of manager " + managerCount.count);
            if (managerCount.count == 0) {
              models.Role.update(
                // Values to update
                    {
                        status: 'open'
                        
                    },
                  { // Clause
                        where: 
                        {
                            role_name: 'Manager'
                        }
                    }
                 );
            }
        console.log("Manager role is open")
          // If an employee gets updated successfully, we just redirect to posts list
          // no need to render a page
          res.redirect("/expense/employee/" + req.params.employee_id);  
          console.log("Employee updated successfully");
    });
    });
};

// Display list of all employees.
exports.employee_list = async function(req, res, next) {

  const data = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense/employees', {method: 'GET'});
  const response = await data.json();
  
  console.log(response);
  
  var viewData = {
    title: 'All Employees',
    layout: 'layouts/main',
    page:'employeePage', 
    display: 'employeeList',
    employees: response.data,
    // user: req.user,
  }
  res.render('pages/index', viewData);   
};

// Display detail page for a specific author.
exports.employee_detail = async function(req, res, next) {
    // const categories = await models.Category.findAll();
    var id = req.params.employee_id

        
    
    const data = await fetch(`https://manifest-expensetracker.herokuapp.com/api/expense/employee/${id}`, {method: 'GET'});
    const response = await data.json();
    
    console.log(response);
    
    var viewData = {
      title: 'Employee Profile',
      page:'employeePage',
      display:'employeeDetail',
      employee: response.data,
      employees: response.employees, 
      expenses: response.expenses,
      departments: response.departments,
      roles: response.roles, 
      deptExpenses: response.deptExpenses,
      allExpenses: response.allExpenses,
      employeeTotalExpenses: response.employeeTotalExpenses,
      employeeExpenses: response.employeeExpenses,
      categories: response.categories,
      types: response.types,
      moment: moment, 
    //   user: req.user,
      layout: 'layouts/main'
    }
    res.render('pages/index', viewData); 

    
};

