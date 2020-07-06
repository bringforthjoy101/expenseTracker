const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');

// LIST ALL DEPARTMENTS.
exports.department_list = async function(req, res, next) {
    const data = await fetch(`${apiUrl}/departments`, {
        method: 'GET',
        headers: {
            cookie: req.headers.cookie,
        }
    });
    const departments = await data.json();

    var viewData = {
        title: 'All Departments',
        page: 'departmentPage',
        display: 'departmentList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        departments: departments.data,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Departments list renders successfully");
};

// READ ONE DEPARTMENT.
exports.department_detail = async function(req, res, next) {
    var id = req.params.department_id;
    const data = await fetch(`${apiUrl}/department/${id}`, {
        method: 'GET',
        headers: {
            cookie: req.headers.cookie,
        }
    });
    const department = await data.json();
    console.log('this is department ' + department);

    var viewData = {
        title: 'Department Details',
        page: 'departmentPage',
        display: 'departmentDetail',
        parent: 'Department List',
        parentUrl: '/departments',
        department: department.data,
        id: id,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Department details renders successfully");
};

 