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
var indexController = require('../controllers/indexController');
var passport = require('passport');
var employee_controller = require('../controllers/employeeController');
var expense_controller = require('../controllers/expenseController'); 
var category_controller = require('../controllers/categoryController');
var type_controller = require('../controllers/typeController');
var role_controller = require('../controllers/roleController');
var department_controller = require('../controllers/departmentController');

// router.get('/', indexController.getIndex);
router.get('/', function(req, res) { res.redirect('/dashboard'); });
// authentication
// router.post('/login', passport.authenticate('local', { successRedirect: '/expense', failureRedirect: '/login' } ));
router.get('/about', indexController.getAbout);

router.get('/signup', function(req, res, next) {
    var viewData = {
        title: 'Sign Up',
        layout: 'layouts/auth',
    }
    res.render('pages/signup', viewData);
});

/// EXPENSE ROUTES ///

router.get('/expense/:expense_id', expense_controller.expense_detail);
router.get('/expenses', expense_controller.expense_list);

//  EMPLOYEE ROUTES ///
router.get('/employee/:employee_id/', employee_controller.employee_detail);
router.get('/employees', employee_controller.employee_list);

// /// Category ROUTES ///
router.get('/category/:category_id', category_controller.category_detail);
router.get('/categories', category_controller.category_list);

// /// Type ROUTES ///
router.get('/type/:type_id', type_controller.type_detail);
router.get('/types', type_controller.type_list);

// /// ROLE ROUTES ///
router.get('/role/:role_id', role_controller.role_detail);
router.get('/roles', role_controller.role_list);

// /// DEPARTMENT ROUTES ///
router.get('/department/:department_id', department_controller.department_detail);
router.get('/departments', department_controller.department_list);

// GET home page.
// router.get('/dashboard', expense_controller.index);


module.exports = router;
