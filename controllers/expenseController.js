var Expense = require('../models/expense');
var models = require('../models');
var tools = require('./../modules/tools');
var dbLayer = require('../modules/dbLayer');

exports.expense_create_get = async function(req, res, next) {
        // renders a post form
        const categories = await models.Category.findAll();
        res.render('forms/expense_form', { title: 'Create Expense', categories: categories,  layout: 'layouts/detail'});
        console.log("Expense form renders successfully")
};
// Display expense create form on GET.
// exports.expense_create_get = function(req, res, next) {
//         // renders a post form
//         res.render('forms/expense_form', { title: 'Create Expense', layout: 'layouts/detail'});
//         console.log("Expense form renders successfully");
// };

// Handle expense create on POST.
exports.expense_create_post = async function(req, res, next) {
    var status;
    if (req.body.amount <= 1000){
        status = 'Approved'
    }else{
      status = 'Pending' 
   }
    let employee_id = req.body.employee_id;

     const employee = await models.Employee.findById(employee_id);
     
     // If the category selected in the front end does not exist in DB return 400 error	
     if (!employee) {
          return res.status(400);
     }

     models.Expense.create({
        title: req.body.title,
        desc: req.body.desc,
        amount: req.body.amount,
        TypeId: req.body.type,
        CategoryId: req.body.category,
        status: status,
        EmployeeId: employee_id,
        DepartmentId: req.body.department
    }).then(function() {
        console.log("Expense created successfully");
       // check if there was an error during post creation
        res.redirect('/expense/expenses/');
  });
     // if it exist then add the expense and employee into the EmployeeExpense table.

        //   await employee.addExpense(expense).then(function() {

        //     res.redirect('/expense/employee/' + employee_id);
        //   });


           // check if there was an error during post creation
            // res.redirect('/expense/employee/' + employee_id);
};

// Handle expense create on POST.
exports.employee_expense_create_post = async function(req, res, next) {
    var status;
    if (req.body.amount <= 1000){
        status = 'Approved'
    }else{
      status = 'Pending' 
   }
   let employee_id = req.body.employee_id;
     // create a new post based on the fields in our post model
     // I have create two fields, but it can be more for your model
    //  const expense = await models.Expense.create({
    //         title: req.body.title,
    //         desc: req.body.desc,
    //         amount: req.body.amount,
    //         type: req.body.type,
    //         category: req.body.category,
    //         status: status,
    //         employee_id: employee_id
    //   });
      
       //This was the category that was selected in the front end.  
    // I queried the database to make sure the category selected exist in DB
     const employee = await models.Employee.findById(employee_id);
     
     // If the category selected in the front end does not exist in DB return 400 error	
     if (!employee) {
          return res.status(400);
     }

     models.Expense.create({
        title: req.body.title,
        desc: req.body.desc,
        amount: req.body.amount,
        TypeId: req.body.type,
        CategoryId: req.body.category,
        status: status,
        EmployeeId: employee_id,
        DepartmentId: req.body.department
    }).then(function() {
        console.log("Expense created successfully");
       // check if there was an error during post creation
        res.redirect('/expense/employee/' + employee_id);
  });
     // if it exist then add the expense and employee into the EmployeeExpense table.

        //   await employee.addExpense(expense).then(function() {

        //     res.redirect('/expense/employee/' + employee_id);
        //   });


           // check if there was an error during post creation
            // res.redirect('/expense/employee/' + employee_id);
};

// Display expense delete form on GET.
exports.expense_delete_get = function(req, res, next) {
       models.Expense.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.expense_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/expense/employee/' + req.params.expense_id);
            console.log("Post deleted successfully");
          });
};

// Handle post delete on POST.
exports.expense_delete_post = function(req, res, next) {
          models.Expense.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.expense_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/expense/employee/' + req.params.expense_id);
            console.log("Expense deleted successfully");
          });

 };

// Display expense update form on GET.
exports.expense_update_get = function(req, res, next) {
        // Find the expense you want to update
        console.log("ID is " + req.params.expense_id);
        models.Expense.findById(
                req.params.expense_id
        ).then(function(expense) {
               // renders a expense form
               res.render('forms/expense_form', { title: 'Update Expense', expense: expense, layout: 'layouts/detail'});
               console.log("Expense update get successful");
          });
        
};

// Handle expense update on POST.
exports.expense_update_post = function(req, res, next) {
        console.log("ID is " + req.params.expense_id);
        models.Expense.update(
        // Values to update
        // if (estatus = pending) {
        //    
       // }
            {
            date: req.body.date,
            detail: req.body.detail,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            estatus: 'Approved'
            },
          { // Clause
                where: 
                {
                    id: req.params.expense_id
                }
            }
        //   returning: true, where: {id: req.params.expense_id} 
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/expense/expenses");  
                console.log("Expense updated successfully");
          });
};

// Display detail page for a specific expense.
exports.expense_detail = function(req, res, next) {
    const moment = require('moment');
        // find a post by the primary key Pk
        models.Expense.findById(
                req.params.expense_id
        ).then(function(expense) {
        // renders an inividual post details page
        res.render('pages/expense_detail', { 
            title: 'Expense Details', 
            expense: expense,
            moment: moment, 
            layout: 'layouts/detail'
        });
        console.log("Expense deteials renders successfully");
        });
};




// Display list of all posts.
exports.expense_list = function(req, res, next) {

    const moment = require('moment');
        // controller logic to display all posts
        models.Expense.findAll({

            include: [
                {
                  model: models.Employee,
                  attributes: ['id', 'first_name', 'last_name']
                },
                {
                    model: models.Category,
                    attributes: ['id', 'name']
                },
                {
                    model: models.Type,
                    attributes: ['id', 'type_name']
                },
                {
                    model: models.Department,
                    attributes: ['id', 'dept_name']
                },
            ]

        }).then(function(expenses) {
            models.Employee.findAll(
                ).then(function(employees) {
        // renders a post list page
        console.log("rendering expense list");
        res.render('pages/expense_list', { 
            title: 'All Expenses', 
            expenses: expenses,
            employees: employees,
            moment:moment,
            layout: 'layouts/list'
        } );
        console.log("Expenses list renders successfully");
        });
    });
        
};

// This is the expense homepage.
exports.index = function(req, res) {

    const moment = require('moment');
    // find the count of posts in database
      models.Expense.findAndCountAll(
      ).then(function(expenseCount) {
        models.Employee.findAndCountAll(
            ).then(function(employeeCount) {

        models.Expense.findAll({
            include: [
                {
                  model: models.Employee,
                  attributes: ['id', 'firstname', 'lastname']
                },
                {
                    model: models.Category,
                    attributes: ['id', 'category_name']
                },
                {
                    model: models.Type,
                    attributes: ['id', 'type_name']
                },
                {
                    model: models.Department,
                    attributes: ['id', 'dept_name']
                },
            ]
            }).then(function(expenses) {

        models.Employee.findAll(
            ).then(function(employee) {

                
                //models.Expense.filter(type).then(function(type_filter){
                
                // let totalSum =  models.Expense.sum('amount')
                models.Expense.sum('amount', { where: { status: 'Approved' } } ).then(function(totalSum) {
            console.log("this is the total sum of expenses = " + totalSum);
            console.log('this is the user: ' + req.user);
            
        res.render('pages/index', {
            title: 'Homepage', 
            expenseCount: expenseCount, 
            employeeCount: employeeCount, 
            expenses: expenses, 
            employee: employee, 
            totalSum: totalSum,
            moment: moment,
            startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
            endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
            user: req.employee,
            // type_filter: type_filter, 
            layout: 'layouts/main'
        });

      });
    });
//});
    });
    });
    });
    
    
    };

// Approve Expense
exports.expense_approve_get = function (req, res) {
  console.log("I am in Approve Expense");
 
  let expense_id = req.params.expense_id;
  let employee_id = req.params.employee_id;
  
  console.log("The employee id is not null " + employee_id);
  console.log("The expense id is not null " + expense_id);
  
  models.Expense.update(
      // Values to update
          {
              status: 'Approved'
              
          },
        { // Clause
              where: 
              {
                  id: req.params.expense_id
              }
          }
      //   returning: true, where: {id: req.params.expense_id} 
       ).then(function(){
        //check if employee id is present in the route
        if(employee_id){
            var message = "Operation Failed"
            res.redirect("/expense/employee/" + employee_id );  
        } else {
            var message = "Operation Failed"
            res.redirect("/expense/employee/" + employee_id ); 
        }
    });
};
// Disapprove Expense
exports.expense_disapprove_get = function (req, res) {
  console.log("I am in Disapprove Expense");
  // console.log("This is params availability ID " + req);
  let expense_id = req.params.expense_id;
   let employee_id = req.params.employee_id;
  
  console.log("The employee id is not null " + employee_id);
  console.log("The expense id is not null " + expense_id);
  models.Expense.update(
      // Values to update
          {
              status: 'Disapproved'
              
          },
        { // Clause
              where: 
              {
                  id: req.params.expense_id
              }
          }
      //   returning: true, where: {id: req.params.scheduleId} 
       ).then(function(){
        //check if employee id is present in the route
        if(employee_id){
            var message = "Operation Successful"
            res.redirect("/expense/employee/" + employee_id );  
        } else {
            var message = "Operation Failed"
            res.redirect("/expense/employee/" + employee_id ); 
        }
    });
};