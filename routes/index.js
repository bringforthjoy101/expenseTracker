/**
 * Index Route.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment');
var indexController = require('../controllers/indexController');
var passport = require('passport');
var employee_controller = require('../controllers/employeeController');
var expense_controller = require('../controllers/expenseController'); 
var category_controller = require('../controllers/categoryController');
var type_controller = require('../controllers/typeController');
var role_controller = require('../controllers/roleController');
var department_controller = require('../controllers/departmentController');

// Middlewares
var requireLogin = require('../middlewares/requireLogin');

// router.get('/', indexController.getIndex);
router.get('/', function(req, res) { res.redirect('/dashboard'); });
// authentication
// router.post('/login', passport.authenticate('local', { successRedirect: '/expense', failureRedirect: '/login' } ));
router.get('/about', indexController.getAbout);

router.get('/signup', async function(req, res, next) {
    const roles = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense/roles', {method: 'GET'});
    const departments = await fetch('https://manifest-expensetracker.herokuapp.com/api/expense/departments', {method: 'GET'});
    const response = await roles.json();
    const response2 = await departments.json();
    
    console.log(response);
    console.log(response2);
    
    var viewData = {
        title: 'Sign Up', 
        page: 'authPage',
        display: 'signup',
        roles: response.data,
        departments: response2.data,
        layout: 'layouts/auth',
    }
    res.render('pages/index', viewData);
});

/// EXPENSE ROUTES ///

router.get('/expense/:expense_id', requireLogin, expense_controller.expense_detail);
router.get('/allExpenses', requireLogin, expense_controller.expense_list);
router.get('/newExpense', requireLogin, expense_controller.expense_new);
router.post('/createExpense', requireLogin, expense_controller.expense_create_post);


//  EMPLOYEE ROUTES ///
router.get('/employee/:employee_id/', requireLogin, employee_controller.employee_detail);
router.get('/allEmployees', requireLogin, employee_controller.employee_list);

// /// Category ROUTES ///
router.get('/category/:category_id', requireLogin, category_controller.category_detail);
router.get('/categories', requireLogin, category_controller.category_list);

// /// Type ROUTES ///
router.get('/type/:type_id', requireLogin, type_controller.type_detail);
router.get('/types', requireLogin, type_controller.type_list);

// /// ROLE ROUTES ///
router.get('/role/:role_id', requireLogin, role_controller.role_detail);
router.get('/employee/roles', requireLogin, role_controller.role_list);

// /// DEPARTMENT ROUTES ///
router.get('/department/:department_id', requireLogin, department_controller.department_detail);
router.get('/employee/departments', requireLogin, department_controller.department_list);

// GET home page.
router.get('/dashboard', requireLogin, expense_controller.index);

    


module.exports = router;
