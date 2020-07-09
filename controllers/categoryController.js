const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const apiFetch = require('../helpers/apiFetch');

// Display list of all categories.
exports.category_list = async function(req, res, next) {
    const categories = await apiFetch(req, res, `${apiUrl}/categories`);

    var viewData = {
        title: 'All Categories',
        page: 'categoryPage',
        display: 'categoryList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        categories: categories.data,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Categories list renders successfully");
};

// Display detail page for a specific category.
exports.category_detail = async function(req, res, next) {
    var id = req.params.category_id;
    const category = await apiFetch(req, res, `${apiUrl}/category/${id}`);

    var viewData = {
        title: 'Category Details',
        page: 'categoryPage',
        display: 'categoryDetail',
        parent: 'Category List',
        parentUrl: '/categories',
        category: category.data,
        id: id,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Category details renders successfully");
};

 