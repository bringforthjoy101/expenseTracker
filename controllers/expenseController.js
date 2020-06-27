var tools = require('./../modules/tools');
const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');


// Read one expense.
exports.expense_detail = async function(req, res, next) {
    var id = req.params.expense_id
    const data = await fetch(`${apiUrl}/expense/${id}`, {method: 'GET'});
    const data2 = await fetch(`${apiUrl}/categories`, {method: 'GET'});
    const data3 = await fetch(`${apiUrl}/types`, {method: 'GET'});
    const response = await data.json();
    const categories = await data2.json();
    const types = await data3.json();
    console.log()
  
    console.log('This is the response: ' + response);
    var viewData = {
        title: 'Expense Details',
        page:'expensePage',
        display:'expenseDetail',
        parent: 'Expense List',
        parentUrl: '/allExpenses',
        api: 'expense',
        id: id,
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
        api: 'expense',
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
        api: 'expense',
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
        api: 'expense',
        categories: categories.data,
        types: types.data,
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
};

// This is the expense homepage.
exports.index = async function(req, res, next) {
    
    const data = await fetch(`${apiUrl}`, {method: 'GET', headers: {}});
    const response = await data.json();
    console.log('this is the auth token ' + req.session.passport.user.token)
    console.log('This is the response: ' + response);
    
    var viewData = {
        title: 'Homepage', 
        page: 'homePage',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        api: 'dashboard',
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
