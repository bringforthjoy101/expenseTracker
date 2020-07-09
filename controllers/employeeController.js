const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const apiFetch = require('../helpers/apiFetch');

// LIST ALL EMPLOYEES.
exports.employee_list = async function(req, res, next) {
    const employees = await apiFetch(req, res, `${apiUrl}/employees`);
    
    var viewData = {
        title: 'All Employees',
        layout: 'layouts/main',
        page: 'employeePage',
        display: 'employeeList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        employees: employees.data,
        user: req.user,
    }
    res.render('pages/index', viewData);
};

// READ ONE EMPLOYEE.
exports.employee_detail = async function(req, res, next) {
    var id = req.params.employee_id;
    const employee = await apiFetch(req, res, `${apiUrl}/employee/${id}`);

    var viewData = {
        title: 'Employee Profile',
        page: 'employeePage',
        display: 'employeeDetail',
        parent: 'Employees List',
        parentUrl: '/allEmployees',
        id: id,
        employee: employee.data,
        expenses: employee.expenses,
        moment: moment,
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);


};

// EMPLOYEE'S PROFILE
exports.profile = async (req, res, next) => {
    var id = req.user.id;
    const employee = await apiFetch(req, res, `${apiUrl}/employee/${id}`);

    var viewData = {
        parent: 'User Dashboard',
        parentUrl: '/dashboard',
        title: 'My Profile',
        employee: employee.data,
        user: req.user,
        amount: employee.employeeTotalExpenses,
        page: 'employeePage',
        display: 'employeeProfile',
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
};