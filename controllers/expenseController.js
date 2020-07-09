var tools = require('./../modules/tools');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const apiFetch = require('../helpers/apiFetch');

// READ ONE EXPENSE.
exports.expense_detail = async function(req, res, next) {
    var id = req.params.expense_id;
    
    const expenses = await apiFetch(req, res, `${apiUrl}/expenses`);
    const categories = await apiFetch(req, res, `${apiUrl}/categories`);
    const types = await apiFetch(req, res, `${apiUrl}/types`);
    const expense = await apiFetch(req, res, `${apiUrl}/expense/${id}`);

    var viewData = {
        title: 'Expense Details',
        page: 'expensePage',
        display: 'expenseDetail',
        parent: 'Expense List',
        parent2: 'My Expense List',
        parentUrl: '/allExpenses',
        parentUrl2: '/myExpenses',
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

// LIST ALL EXPENSES.
exports.expense_list = async function(req, res, next) {
    const expenses = await apiFetch(req, res, `${apiUrl}/expenses`);
    const categories = await apiFetch(req, res, `${apiUrl}/categories`);
    const types = await apiFetch(req, res, `${apiUrl}/types`);

    var viewData = {
        title: 'All Expenses',
        page: 'expensePage',
        display: 'expenseList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        expenses: expenses.data,
        categories: categories.data,
        types: types.data,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expenses list renders successfully");
};

// READ MY EXPENSES.
exports.my_expense_list = async function(req, res, next) {
    const expenses = await apiFetch(req, res, `${apiUrl}/myExpenses`);
    const categories = await apiFetch(req, res, `${apiUrl}/categories`);
    const types = await apiFetch(req, res, `${apiUrl}/types`);

    var viewData = {
        title: 'My Expenses',
        page: 'expensePage',
        display: 'myExpenseList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        expenses: expenses.data,
        categories: categories.data,
        types: types.data,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expenses list renders successfully");
};

// CREATE NEW EXPENSE.
exports.expense_new = async function(req, res, next) {
    try {
        const managers = await apiFetch(req, res, `${apiUrl}/managers`);
        const categories = await apiFetch(req, res, `${apiUrl}/categories`);
        const types = await apiFetch(req, res, `${apiUrl}/types`);
        
        var viewData = {
            title: 'Expense Create',
            page: 'expensePage',
            display: 'expenseCreate',
            parent: 'Dashboard',
            parentUrl: '/dashboard',
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

// EXPENSE HOMEPAGE.
exports.index = async function(req, res, next) {
    const dashboard = await apiFetch(req, res, `${apiUrl}`);
    const myExpenses = await apiFetch(req, res, `${apiUrl}/myExpenses`);

    var viewData = {
        title: 'Homepage',
        page: 'homePage',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        expenseCount: dashboard.expenseCount,
        employeeCount: dashboard.employeeCount,
        expenses: dashboard.expenses,
        totalSum: dashboard.totalSum,
        myTotalSum: dashboard.myTotalSum,
        expensesToday: dashboard.expensesToday,
        expensesTodayCount: dashboard.expensesTodayCount,
        totalSumToday: dashboard.totalSumToday,
        totalSumYesterday: dashboard.totalSumYesterday,
        totalSumThisWeek: dashboard.totalSumThisWeek,
        totalSumThisMonth: dashboard.totalSumThisMonth,
        myExpenses: myExpenses.data,
        moment: moment,
        startDate: tools.convertMillisecondsToStringDate(req.session.startDate),
        endDate: tools.convertMillisecondsToStringDate(req.session.lastRequestDate),
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
};