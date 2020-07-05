
const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');

// Display list of all employees.
exports.employee_list = async function(req, res, next) {
  console.log('this is the api url ' + apiUrl);
  const data = await fetch(`${apiUrl}/employees`, {
    method: 'GET',
    headers:{
      cookie: req.headers.cookie,
    }
  });                             
  const response = await data.json();
  
  console.log(response);
  
  var viewData = {
    title: 'All Employees',
    layout: 'layouts/main',
    page:'employeePage', 
    display: 'employeeList',
    parent: 'Dashboard',
    parentUrl: '/dashboard',
    api: 'employee',
    employees: response.data,
    user: req.user,
  }
  res.render('pages/index', viewData);   
};

// Display detail page for a specific author.
exports.employee_detail = async function(req, res, next) {
    var id = req.params.employee_id
    const data = await fetch(`${apiUrl}/employee/${id}`, {
      method: 'GET',
      headers:{
        cookie: req.headers.cookie,
      }
    });
    const response = await data.json();
    
    console.log(response);
    
    var viewData = {
        title: 'Employee Profile',
        page:'employeePage',
        display:'employeeDetail',
        parent: 'Employees List',
        parentUrl: '/allEmployees',
        api: 'employee',
        id: id,
        employee: response.data,
        expenses: response.expenses,
        moment: moment, 
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData); 

    
};

exports.profile = async (req, res, next) => {
  var id = req.user.id;
  const data = await fetch(`${apiUrl}/employee/${id}`, {
    method: 'GET',
    headers:{
      cookie: req.headers.cookie,
    }
  });
  const data2 = await fetch(`${apiUrl}/departments`, {
      method: 'GET',
      headers:{
        cookie: req.headers.cookie,
      }
  });
  const data3 = await fetch(`${apiUrl}/roles`, {
      method: 'GET',
      headers:{
        cookie: req.headers.cookie,
      }
  });
  const response = await data.json();
  const departments = await data2.json();
  const roles = await data3.json();
  
  var viewData = {
    parent: 'User Dashboard',
    parentUrl: '/dashboard',
    title: 'My Profile',
    employee: response.data,
    departments: departments.data,
    roles: roles.data,
    user: req.user,
    amount: response.employeeTotalExpenses,
    page:'employeePage',
    display:'employeeProfile',
    layout: 'layouts/main'
  }
  res.render('pages/index', viewData);
};

