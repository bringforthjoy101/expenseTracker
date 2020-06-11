var express = require('express');
var router = express.Router();


// Require our controllers.
var employee_controller = require('../controllers/employeeController');
var expense_controller = require('../controllers/expenseController'); 
var category_controller = require('../controllers/categoryController');
var type_controller = require('../controllers/typeController');
var role_controller = require('../controllers/roleController');
var department_controller = require('../controllers/departmentController');
var userController = require('../controllers/userController');




/// EXPENSE ROUTES ///

// GET request for creating a Expense. NOTE This must come before routes that display Post (uses id).
router.get('/expense/create', expense_controller.expense_create_get);

// POST request for creating Expense.
router.post('/expense/create', expense_controller.expense_create_post);

// POST request for creating Expense in Employee Page.
router.post('/employee/expense/create', expense_controller.expense_create_post);

// GET request to delete Expense.
router.get('/expense/:expense_id/delete', expense_controller.expense_delete_get);

// POST request to delete Expense.
router.post('/expense/:expense_id/delete', expense_controller.expense_delete_post);

// POST request to update Expense.
router.post('/expense/:expense_id/update',expense_controller.expense_update_post);

// GET request for one Expense.
router.get('/expense/:expense_id', expense_controller.expense_detail);


// GET request for list of all Expense.
router.get('/expenses', expense_controller.expense_list);

// Approve Expense - within employee route

router.get('/employee/:employee_id/expense/:expense_id/approval/:status_code', expense_controller.expense_approve_get);

router.get('/employee/:employee_id/expense/:expense_id/approve', expense_controller.expense_approve_get);
// disapprove schedule - within employee route
router.get('/employee/:employee_id/expense/:expense_id/disapprove', expense_controller.expense_disapprove_get);

//  EMPLOYEE ROUTES ///

// GET request for creating employee. NOTE This must come before route for id (i.e. display employee).
router.get('/employee/create', employee_controller.employee_create_get);

// POST request for creating employee.
router.post('/employee/create', employee_controller.employee_create_post);

// POST request to delete employee.
router.get('/employee/:employee_id/delete', employee_controller.employee_delete_get);

// POST request to delete employee.
router.post('/employee/:employee_id/delete', employee_controller.employee_delete_post);

// GET request to update Employee.
router.get('/employee/:employee_id/update', employee_controller.employee_update_get);

// POST request to update Employee.
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);

// GET request for one employee.
router.get('/employee/:employee_id/', employee_controller.employee_detail);

// GET request for one employee.
router.get('/employee/:employee_id/:employee_department', employee_controller.employee_detail);

// GET request for list of all Employees.
router.get('/employees', employee_controller.employee_list);



// /// Category ROUTES ///

// GET request for creating a Category. NOTE This must come before route that displays Category (uses id).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// POST request to delete Category.
router.post('/category/:category_id/delete', category_controller.category_delete_post);

// GET request to delete Category.
router.get('/category/:category_id/delete', category_controller.category_delete_get);

// POST request to update Category.
router.post('/category/:category_id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:category_id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);


// /// Type ROUTES ///

// GET request for creating Type. NOTE This must come before route for id (i.e. display type).
router.get('/type/create', type_controller.type_create_get);

// POST request for creating Type.
router.post('/type/create', type_controller.type_create_post);

// GET request to delete Type.
router.get('/type/:type_id/delete', type_controller.type_delete_get);

// POST request to delete Type.
router.post('/type/:type_id/delete', type_controller.type_delete_post);

// POST request to update Type.
router.post('/type/:type_id/update', type_controller.type_update_post);

// GET request for one Type.
router.get('/type/:type_id', type_controller.type_detail);

// GET request for list of all Types.
router.get('/types', type_controller.type_list);

// /// ROLE ROUTES ///

// GET request for creating role. NOTE This must come before route for id (i.e. display role).
router.get('/role/create', role_controller.role_create_get);

// POST request for creating role.
router.post('/role/create', role_controller.role_create_post);

// POST request to delete role.
router.post('/role/:role_id/delete', role_controller.role_delete_post);

// GET request to delete Role.
router.get('/role/:role_id/delete', role_controller.role_delete_get);

// POST request to update role.
router.post('/role/:role_id/update', role_controller.role_update_post);

// GET request for one role.
router.get('/role/:role_id', role_controller.role_detail);

// GET request for list of all roles.
router.get('/roles', role_controller.role_list);

// /// DEPARTMENT ROUTES ///

// GET request for creating department. NOTE This must come before route for id (i.e. display department).
router.get('/department/create', department_controller.department_create_get);

// POST request for creating department.
router.post('/department/create', department_controller.department_create_post);

// POST request to delete department.
router.post('/department/:department_id/delete', department_controller.department_delete_post);

// GET request to delete Department.
router.get('/department/:department_id/delete', department_controller.department_delete_get);

// POST request to update department.
router.post('/department/:department_id/update', department_controller.department_update_post);

// GET request for one department.
router.get('/department/:department_id', department_controller.department_detail);

// GET request for list of all departments.
router.get('/departments', department_controller.department_list);

// GET home page.
router.get('/', expense_controller.index); 

// export all the router created
module.exports = router;
