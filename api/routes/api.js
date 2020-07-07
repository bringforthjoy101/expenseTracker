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
const requireAdmin = require('../../middlewares/requireAdmin');


/// EXPENSE ROUTES ///
router.post('/expense/create', expense_controller.expense_create_post);
router.post('/expense/:expense_id/delete', expense_controller.expense_delete_post);
router.post('/expense/:expense_id/update', expense_controller.expense_update_post);
router.get('/expense/:expense_id', expense_controller.expense_detail);
router.get('/expenses', requireAdmin, expense_controller.expense_list);
router.get('/myExpenses', expense_controller.my_expenses);
router.get('/expense/:expense_id/approval/:status_code', requireAdmin, expense_controller.expense_approval_get);

//  EMPLOYEE ROUTES ///
router.post('/employee/create', requireAdmin, employee_controller.employee_create_post);
router.post('/employee/:employee_id/delete', requireAdmin, employee_controller.employee_delete_post);
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);
router.get('/employee/:employee_id/', requireAdmin, employee_controller.employee_detail);
router.get('/employees', requireAdmin, employee_controller.employee_list);
router.get('/managers', employee_controller.manager_list);

/// CATEGORY ROUTES ///
router.post('/category/create', requireAdmin, category_controller.category_create_post);
router.post('/category/:category_id/delete', requireAdmin, category_controller.category_delete_post);
router.get('/category/:category_id', requireAdmin, category_controller.category_detail);
router.get('/categories', category_controller.category_list);

/// TYPE ROUTES ///
router.post('/type/create', requireAdmin, type_controller.type_create_post);
router.post('/type/:type_id/delete', requireAdmin, type_controller.type_delete_post);
router.get('/type/:type_id', requireAdmin, type_controller.type_detail);
router.get('/types', type_controller.type_list);

/// ROLE ROUTES ///
router.post('/role/create', requireAdmin, role_controller.role_create_post);
router.post('/role/:role_id/delete', requireAdmin, role_controller.role_delete_post);
router.get('/role/:role_id', requireAdmin, role_controller.role_detail);
router.get('/roles', role_controller.role_list);

/// DEPARTMENT ROUTES ///
router.post('/department/create', requireAdmin, department_controller.department_create_post);
router.post('/department/:department_id/delete', requireAdmin, department_controller.department_delete_post);
router.get('/department/:department_id', requireAdmin, department_controller.department_detail);
router.get('/departments', requireAdmin, department_controller.department_list);

// DASHBOARD ROUTE.
router.get('/', expense_controller.index); 

// export all the router created
module.exports = router;