
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
        employee: response.data,
        expenses: response.expenses,
        moment: moment, 
        user: req.user,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData); 

    
};

