const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const apiFetch = require('../helpers/apiFetch');

// LIST ALL DEPARTMENTS.
exports.department_list = async function(req, res, next) {
    const departments = await apiFetch(req, res, `${apiUrl}/departments`);

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
    const department = await apiFetch(req, res, `${apiUrl}/department/${id}`);

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

 