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
const requireLogin = require('../../middlewares/requireLogin');
const requireAdmin = require('../../middlewares/requireAdmin');


/// EXPENSE ROUTES ///
router.post('/expense/create', requireLogin, expense_controller.expense_create_post);
router.post('/expense/:expense_id/delete', requireLogin, expense_controller.expense_delete_post);
router.post('/expense/:expense_id/update', requireLogin, expense_controller.expense_update_post);
router.get('/expense/:expense_id', requireLogin, expense_controller.expense_detail);
router.get('/expenses', requireLogin, requireAdmin, expense_controller.expense_list);
router.get('/myExpenses', requireLogin, expense_controller.my_expenses);
router.get('/expense/:expense_id/approval/:status_code', requireLogin, requireAdmin, expense_controller.expense_approval_get);

//  EMPLOYEE ROUTES ///
router.post('/employee/create', requireLogin, requireAdmin, employee_controller.employee_create_post);
router.post('/employee/:employee_id/delete', requireLogin, requireAdmin, employee_controller.employee_delete_post);
router.post('/employee/:employee_id/update', requireLogin, employee_controller.employee_update_post);
router.get('/employee/:employee_id/', requireLogin, requireAdmin, employee_controller.employee_detail);
router.get('/employees', requireLogin, requireAdmin, employee_controller.employee_list);
router.get('/managers', requireLogin, employee_controller.manager_list);

/// CATEGORY ROUTES ///
router.post('/category/create', requireLogin, requireAdmin, category_controller.category_create_post);
router.post('/category/:category_id/delete', requireLogin, requireAdmin, category_controller.category_delete_post);
router.get('/category/:category_id', requireLogin, requireAdmin, category_controller.category_detail);
router.get('/categories', requireLogin, category_controller.category_list);

/// TYPE ROUTES ///
router.post('/type/create', requireLogin, requireAdmin, type_controller.type_create_post);
router.post('/type/:type_id/delete', requireLogin, requireAdmin, type_controller.type_delete_post);
router.get('/type/:type_id', requireLogin, requireAdmin, type_controller.type_detail);
router.get('/types', requireLogin, type_controller.type_list);

/// ROLE ROUTES ///
router.post('/role/create', requireLogin, requireAdmin, role_controller.role_create_post);
router.post('/role/:role_id/delete', requireLogin, requireAdmin, role_controller.role_delete_post);
router.get('/role/:role_id', requireLogin, requireAdmin, role_controller.role_detail);
router.get('/roles', requireLogin, role_controller.role_list);

/// DEPARTMENT ROUTES ///
router.post('/department/create', requireLogin, requireAdmin, department_controller.department_create_post);
router.post('/department/:department_id/delete', requireLogin, requireAdmin, department_controller.department_delete_post);
router.get('/department/:department_id', requireLogin, requireAdmin, department_controller.department_detail);
router.get('/departments', requireLogin, requireAdmin, department_controller.department_list);

// DASHBOARD ROUTE.
router.get('/', requireLogin, expense_controller.index); 

// export all the router created
module.exports = router;