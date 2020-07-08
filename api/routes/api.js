var express = require('express');
var router = express.Router();


// Require our controllers.
var employee_controller = require('../controllers/userController');
var expense_controller = require('../controllers/expenseController'); 
var category_controller = require('../controllers/categoryController');
var type_controller = require('../controllers/typeController');
var role_controller = require('../controllers/roleController');
var department_controller = require('../controllers/departmentController');

// Require the middleware
// const authorize = require('../../middlewares/authorize');
// const Role = require('../../helpers/role');
// const requireLogin = require('../../middlewares/requireLogin');
const requireManager = require('../../middlewares/requireManager');
const review = require('../../middlewares/review');
const employeeAction = require('../../middlewares/employeeAction');


/// EXPENSE ROUTES ///
router.post('/expense/create', expense_controller.expense_create_post);
router.post('/expense/:expense_id/delete', review, expense_controller.expense_delete_post);
router.post('/expense/:expense_id/update', review, expense_controller.expense_update_post);
router.get('/expense/:expense_id', expense_controller.expense_detail);
router.get('/expenses', requireManager, expense_controller.expense_list);
router.get('/myExpenses', expense_controller.my_expenses);
router.get('/expense/:expense_id/approval/:status_code', review, requireManager, expense_controller.expense_approval_get);

//  EMPLOYEE ROUTES ///
router.post('/employee/create', requireManager, employee_controller.employee_create_post);
router.post('/employee/:employee_id/delete', requireManager, employee_controller.employee_delete_post);
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);
router.get('/employee/:employee_id/', requireManager, employee_controller.employee_detail);
router.get('/employees', requireManager, employee_controller.employee_list);
router.get('/managers', employee_controller.manager_list);

/// CATEGORY ROUTES ///
router.post('/category/create', requireManager, category_controller.category_create_post);
router.post('/category/:category_id/delete', requireManager, category_controller.category_delete_post);
router.get('/category/:category_id', requireManager, category_controller.category_detail);
router.get('/categories', category_controller.category_list);

/// TYPE ROUTES ///
router.post('/type/create', requireManager, type_controller.type_create_post);
router.post('/type/:type_id/delete', requireManager, type_controller.type_delete_post);
router.get('/type/:type_id', requireManager, type_controller.type_detail);
router.get('/types', type_controller.type_list);

/// ROLE ROUTES ///
router.post('/role/create', requireManager, role_controller.role_create_post);
router.post('/role/:role_id/delete', requireManager, role_controller.role_delete_post);
router.get('/role/:role_id', requireManager, role_controller.role_detail);
router.get('/roles', role_controller.role_list);

/// DEPARTMENT ROUTES ///
router.post('/department/create', requireManager, department_controller.department_create_post);
router.post('/department/:department_id/delete', requireManager, department_controller.department_delete_post);
router.get('/department/:department_id', requireManager, department_controller.department_detail);
router.get('/departments', requireManager, department_controller.department_list);

// DASHBOARD ROUTE.
router.get('/', expense_controller.index); 

// export all the router created
module.exports = router;