var Expense = require('../models/expense');
var models = require('../models');
var tools = require('./../modules/tools');
const fetch = require('node-fetch');
const moment = require('moment');


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
    let employee_id = req.user.id // req.body.employee_id;

     const employee = await models.user.findById(employee_id);
     
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
     const employee = await models.user.findById(employee_id);
     
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
exports.expense_detail = async function(req, res, next) {
    var id = req.params.expense_id
    const data = await fetch(`https://manifest-expensetracker.herokuapp.com/api/expense/expense/${id}`, {method: 'GET'});
    const response = await data.json();
  
    console.log('This is the response: ' + response);
    var viewData = {
        title: 'Expense Details', 
        expense: response.data,
        user: req.user,
        moment: moment, 
        layout: 'layouts/detail'
    }
    res.render('pages/expense_detail', viewData);
    console.log("Expense deteials renders successfully");
       
};


// Display list of all posts.
exports.expense_list = async function(req, res, next) {
    const data = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense/expenses', {method: 'GET'});
    const response = await data.json();
    console.log('This is the response: ' + response);
    
    var viewData = {
        title: 'All Expenses', 
        expenses: response.data,
        user: req.user,
        moment:moment,
        layout: 'layouts/list'
    }
    res.render('pages/expense_list', viewData);
    console.log("Expenses list renders successfully");
};

// This is the expense homepage.
exports.index = async function(req, res, next) {
    const data = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense', {method: 'GET'});
    const response = await data.json();
    console.log('This is the response: ' + response);
    
    var viewData = {
        title: 'Homepage', 
        expenseCount: response.expenseCount, 
        employeeCount: response.employeeCount, 
        expenses: response.expenses,  
        totalSum: response.totalSum,
        moment: moment,
        startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
        endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
        user: req.user,
        layout: 'layouts/main'
    }
          
    res.render('pages/index', viewData);

    
    
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