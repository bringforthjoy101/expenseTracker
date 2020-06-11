var Employee = require('../models/employee');
var models = require('../models');
var employee = require('./../controllers/api/employeeController');
const request = require('request');

const path = require('path');


// Display employee create form on GET.
exports.employee_create_get = function(req, res, next) {
        // create employee GET controller logic here 
        res.render('forms/employee_form', { title: 'Create Employee',  layout: 'layouts/detail'});
};

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
exports.employee_list = function(req, res, next) {

  // request('127.0.0.1:8080/api/expense/employees', function (error, response, body) {
  //   console.error('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response ); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  //   const data = JSON.parse(body)

  //   res.render('pages/employee_list', { 
  //     title: 'All Employees', 
  //     employees: data.data,
  //     layout: 'layouts/list'} );
  // });
          // controller logic to display all posts
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
            // renders a post list page
            console.log("rendering employee list");
            res.render('pages/employee_list', { 
              title: 'All Employees', 
              employees: employees,
              layout: 'layouts/list'} );
            console.log("Employees list renders successfully");
            });
      
};

// Display detail page for a specific author.
exports.employee_detail = async function(req, res, next) {
    // const categories = await models.Category.findAll();

    const moment = require('moment');    

    console.log("This is the employee id " + req.params.employee_id);
    console.log("This is the employee department " + req.params.employee_department);
    // Listing all expenses created by an employee
    const expenses = await models.Expense.findAll({
      include: [
        {
          model: models.Employee,
          attributes: ['id', 'first_name', 'last_name','DepartmentId']
        },
    ],
      where: {
        EmployeeId: req.params.employee_id,
      },
  });

    // Listing all expenses created by all employees
    const deptExpenses = await models.Expense.findAll({
      where: {
        DepartmentId: req.params.employee_department,
      },
    });

    

    const allExpenses = await models.Expense.findAll({
      include: [
        {
          model: models.Employee,
          attributes: ['id', 'first_name', 'last_name']
        },
    ]
  });

    const employeeExpenses = await  models.Expense.findAndCountAll({
      where: {EmployeeId: req.params.employee_id}
    });

    const employeeTotalExpenses = await models.Expense.sum('amount', {where: {EmployeeId: req.params.employee_id} });

    

    console.log("This is the expenses for that employed id " + req.params.employee_id);
    console.log("This is the expenses for that employee dept " + req.params.employee_department);

     // find a post by the primary key Pk
     models.Employee.findById(
      req.params.employee_id, 
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
            models.Category.findAll().then(function(categories) {
              models.Type.findAll().then(function(types) {
                  models.Department.findAll().then(function(departments) {
                    models.Role.findAll({
                      where: {
                        status: 'open'
                      }
                    }).then(function(roles) {
                      

      // console.log("This is employee expense " + employee.expenses.length);
      // renders an inividual post details page
      res.render('pages/employee_detail', { 
        title: 'Employee Profile', 
        employee: employee, 
        employees:employees, 
        expenses: expenses,
        departments: departments,
        roles: roles, 
        deptExpenses: deptExpenses,
        allExpenses: allExpenses,
        employeeTotalExpenses: employeeTotalExpenses,
        employeeExpenses: employeeExpenses,
        categories: categories,
        types: types,
        moment: moment, 
        layout: 'layouts/detail'
      });
      console.log("Employee detials renders successfully");
      });
      });
      });
      });
      });
      });
};

