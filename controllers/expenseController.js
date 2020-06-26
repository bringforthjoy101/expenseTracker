var Expense = require('../models/expense');
var models = require('../models');
var tools = require('./../modules/tools');
const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');


exports.expense_create_get = async function(req, res, next) {
        // renders a post form
        const categories = await models.Category.findAll();
        res.render('forms/expense_form', { title: 'Create Expense', categories: categories,  layout: 'layouts/detail'});
        console.log("Expense form renders successfully")
};


// Handle expense create on POST.
exports.expense_create_post = async function(req, res, next) {
    try {
        const body = { 
            title: req.body.title,
            desc: req.body.desc,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            business_name: req.user.current_business,
            department: req.user.DepartmentId,
            employee_id: req.user.id
        };
        
        const data = await fetch(`${apiUrl}/create`, {
                method: 'post', 
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            
            const expense = await data.json();
            if (expense.status) {
                res.redirect("/expense/" + expense.data.id );
            }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
        
};


// Display detail page for a specific expense.
exports.expense_detail = async function(req, res, next) {
    var id = req.params.expense_id
    const data = await fetch(`${apiUrl}/expense/${id}`, {method: 'GET'});
    const data2 = await fetch(`${apiUrl}/categories`, {method: 'GET'});
    const data3 = await fetch(`${apiUrl}/types`, {method: 'GET'});
    const response = await data.json();
    const categories = await data2.json();
    const types = await data3.json();
  
    console.log('This is the response: ' + response);
    var viewData = {
        title: 'Expense Details',
        page:'expensePage',
        display:'expenseDetail',
        parent: 'Expense List',
        parentUrl: '/allExpenses',
        expense: response.data,
        categories: categories.data,
        types: types.data,
        user: req.user,
        moment: moment, 
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expense one details renders successfully");
       
};


// Display list of all Expenses.
exports.expense_list = async function(req, res, next) {
    const data = await fetch(`${apiUrl}/expenses`, {method: 'GET'});
    const data2 = await fetch(`${apiUrl}/categories`, {method: 'GET'});
    const data3 = await fetch(`${apiUrl}/types`, {method: 'GET'});
    const expenses = await data.json();
    const categories = await data2.json();
    const types = await data3.json();
    console.log('This is the response: ' + expenses);
    
    var viewData = {
        title: 'All Expenses',
        page:'expensePage',
        display:'expenseList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        expenses: expenses.data,
        categories: categories.data,
        types: types.data,
        user: req.user,
        moment:moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expenses list renders successfully");
};

// Display list of my Expenses.
exports.my_expense_list = async function(req, res, next) {
    const data = await fetch(`${apiUrl}/myExpenses`, {method: 'GET'});
    const data2 = await fetch(`${apiUrl}/categories`, {method: 'GET'});
    const data3 = await fetch(`${apiUrl}/types`, {method: 'GET'});
    const expenses = await data.json();
    const categories = await data2.json();
    const types = await data3.json();
    console.log('This is the response: ' + expenses);
    
    var viewData = {
        title: 'All Expenses',
        page:'expensePage',
        display:'expenseList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        expenses: expenses.data,
        categories: categories.data,
        types: types.data,
        user: req.user,
        moment:moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expenses list renders successfully");
};

// New Expense.
exports.expense_new = async function(req, res, next) {
    const data = await fetch(`${apiUrl}/categories`, {method: 'GET'});
    const data2 = await fetch(`${apiUrl}/types`, {method: 'GET'});
    const categories = await data.json();
    const types = await data2.json();
    console.log('this is the category ' + categories);
    console.log('this is the type ' + types);
    var viewData = {
        title: 'Expense Create',
        page:'expensePage',
        display:'expenseCreate',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        categories: categories.data,
        types: types.data,
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
};

// This is the expense homepage.
exports.index = async function(req, res, next) {
    
    const data = await fetch(`${apiUrl}`, {method: 'GET'});
    const response = await data.json();
    console.log('This is the response: ' + response);
    
    var viewData = {
        title: 'Homepage', 
        page: 'homePage',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
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
