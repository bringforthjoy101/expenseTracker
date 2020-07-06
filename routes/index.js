var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var employee_controller = require('../controllers/employeeController');
var expense_controller = require('../controllers/expenseController'); 
var category_controller = require('../controllers/categoryController');
var type_controller = require('../controllers/typeController');
var role_controller = require('../controllers/roleController');
var department_controller = require('../controllers/departmentController');

// MIDDLEWARES
// var requireLogin = require('../middlewares/requireLogin');
var requireAdmin = require('../middlewares/requireAdmin');


router.get('/', function(req, res) { res.redirect('/login'); });
router.get('/about', indexController.getAbout);
router.get('/signup', async function(req, res, next) {
    
    var viewData = {
        title: 'Sign Up', 
        page: 'authPage',
        display: 'signup',
        layout: 'layouts/auth',
    }
    res.render('pages/index', viewData);
});

/// EXPENSE ROUTES ///
router.get('/expense/:expense_id', expense_controller.expense_detail);
router.get('/allExpenses', requireAdmin, expense_controller.expense_list);
router.get('/newExpense', expense_controller.expense_new); // renders the expense create page
router.get('/myExpenses', expense_controller.my_expense_list);

/// EMPLOYEE ROUTES ///
router.get('/employee/:employee_id/', requireAdmin, employee_controller.employee_detail);
router.get('/allEmployees', requireAdmin, employee_controller.employee_list);
router.get('/profile', employee_controller.profile);

/// Category ROUTES ///
router.get('/category/:category_id', requireAdmin, category_controller.category_detail);
router.get('/categories', requireAdmin, category_controller.category_list);

/// Type ROUTES ///
router.get('/type/:type_id', requireAdmin, type_controller.type_detail);
router.get('/types', requireAdmin, type_controller.type_list);

/// ROLE ROUTES ///
router.get('/role/:role_id', requireAdmin, role_controller.role_detail);
router.get('/roles', requireAdmin, role_controller.role_list);

/// DEPARTMENT ROUTES ///
router.get('/department/:department_id', requireAdmin, department_controller.department_detail);
router.get('/departments', requireAdmin, department_controller.department_list);

// GET home page.
router.get('/dashboard', expense_controller.index);

    


module.exports = router;
