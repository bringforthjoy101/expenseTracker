var tools = require('./../modules/tools');
const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');

// Read one expense.
exports.expense_detail = async function(req, res, next) {
    var id = req.params.expense_id;
    
    console.log('Logged in User Email ' + req.user.email);
    console.log('Logged in User Password ' + req.user.password);
    const data = await fetch(`${apiUrl}/expenses`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data2 = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data3 = await fetch(`${apiUrl}/types`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data4 = await fetch(`${apiUrl}/expense/${id}`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const expenses = await data.json();
    const categories = await data2.json();
    const types = await data3.json();
    const expense = await data4.json();
    
    

    var viewData = {
        title: 'Expense Details',
        page:'expensePage',
        display:'expenseDetail',
        parent: 'Expense List',
        parent2: 'My Expense List',
        parentUrl: '/allExpenses',
        parentUrl2: '/myExpenses',
        api: 'expense',
        id: id,
        expense: expense.data,
        expenses: expenses.data,
        types: types.data,
        categories: categories.data,
        user: req.user,
        moment: moment, 
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expense one details renders successfully");
       
};

// Display list of all Expenses.
exports.expense_list = async function(req, res, next) {
    const data = await fetch(`${apiUrl}/expenses`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data2 = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data3 = await fetch(`${apiUrl}/types`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
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
    const data = await fetch(`${apiUrl}/myExpenses`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data2 = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const data3 = await fetch(`${apiUrl}/types`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const expenses = await data.json();
    const categories = await data2.json();
    const types = await data3.json();
    console.log('This is the response: ' + expenses);
    
    var viewData = {
        title: 'My Expenses',
        page:'expensePage',
        display:'myExpenseList',
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

// create New Expense.
exports.expense_new = async function(req, res, next) {
    try {
        const data = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
            headers:{
              cookie: req.headers.cookie,
            }
        });
        const data2 = await fetch(`${apiUrl}/types`, {
            method: 'GET',
            headers:{
              cookie: req.headers.cookie,
            }
        });
        const data3 = await fetch(`${apiUrl}/managers`, {
            method: 'GET',
            headers:{
              cookie: req.headers.cookie,
            }
        });
        const categories = await data.json();
        const types = await data2.json();
        const managers = await data3.json();
        console.log('this is create expense');
        console.log('this is the category ' + categories.data);
        console.log('this is the type ' + types.data);
        console.log('this is the managers ' + managers.data);
        var viewData = {
            title: 'Expense Create',
            page:'expensePage',
            display:'expenseCreate',
            parent: 'Dashboard',
            parentUrl: '/dashboard',
            api: 'expense',
            categories: categories.data,
            types: types.data,
            managers: managers.data,
            user: req.user,
            layout: 'layouts/main'
        }
        res.render('pages/index', viewData);
    } catch (error) {
        res.json({
            status: false,
            message: `there was an error - ${error}`
        })
    }
    
};

// This is the expense homepage.
exports.index = async function(req, res, next) {
    
    const data = await fetch(`${apiUrl}`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    
    const data2 = await fetch(`${apiUrl}/myExpenses`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const response = await data.json();
    const myExpenses = await data2.json();
    console.log('this is the response ' + response.status);
    
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
        myExpenses: myExpenses.data,
        moment: moment,
        startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
        endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
};
