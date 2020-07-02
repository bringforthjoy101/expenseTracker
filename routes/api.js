var express = require('express');
var router = express.Router();


// Require our controllers.
var employee_controller = require('../controllers/api/userController');
var expense_controller = require('../controllers/api/expenseController'); 
var category_controller = require('../controllers/api/categoryController');
var type_controller = require('../controllers/api/typeController');
var role_controller = require('../controllers/api/roleController');
var department_controller = require('../controllers/api/departmentController');

// Require the middleware
const authorize = require('../middlewares/authorize');
const Role = require('../helpers/role');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');


/// EXPENSE ROUTES ///

// POST request for creating Expense.
router.post('/expense/create', expense_controller.expense_create_post);

// POST request to delete Expense.
router.post('/expense/:expense_id/delete', expense_controller.expense_delete_post);

// POST request to update Expense.
router.post('/expense/:expense_id/update', expense_controller.expense_update_post);

// GET request for one Expense.
router.get('/expense/:expense_id', expense_controller.expense_detail);


// GET request for list of all Expense.
router.get('/expenses', expense_controller.expense_list);
router.get('/myExpenses', expense_controller.my_expenses);

// Approval for Expense
router.get('/expense/:expense_id/approval/:status_code', expense_controller.expense_approval_get);

//  EMPLOYEE ROUTES ///


// POST request for creating employee.
router.post('/employee/create', employee_controller.employee_create_post);

// POST request to delete employee.
router.post('/employee/:employee_id/delete', employee_controller.employee_delete_post);

// POST request to update Employee.
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);

// GET request for one employee.
router.get('/employee/:employee_id/', employee_controller.employee_detail);

// GET request for list of all Employees.
router.get('/employees', employee_controller.employee_list);



// /// Category ROUTES ///

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// POST request to delete Category.
router.post('/category/:category_id/delete', category_controller.category_delete_post);

// GET request for one Category.
router.get('/category/:category_id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);


// /// Type ROUTES ///

// POST request for creating Type.
router.post('/type/create', type_controller.type_create_post);

// POST request to delete Type.
router.post('/type/:type_id/delete', type_controller.type_delete_post);


// GET request for one Type.
router.get('/type/:type_id', type_controller.type_detail);

// GET request for list of all Types.
router.get('/types', type_controller.type_list);

// /// ROLE ROUTES ///


// POST request for creating role.
router.post('/role/create', role_controller.role_create_post);

// POST request to delete role.
router.post('/role/:role_id/delete', role_controller.role_delete_post);

// GET request for one role.
router.get('/role/:role_id', role_controller.role_detail);

// GET request for list of all roles.
router.get('/roles', role_controller.role_list);

// /// DEPARTMENT ROUTES ///


// POST request for creating department.
router.post('/department/create', department_controller.department_create_post);

// POST request to delete department.
router.post('/department/:department_id/delete', department_controller.department_delete_post);

// GET request for one department.
router.get('/department/:department_id', department_controller.department_detail);

// GET request for list of all departments.
router.get('/departments', department_controller.department_list);

// GET home page.
router.get('/', expense_controller.index); 

// export all the router created
module.exports = router;
