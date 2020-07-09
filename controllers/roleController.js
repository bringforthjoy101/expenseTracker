const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const apiFetch = require('../helpers/apiFetch');

// LIST ALL ROLES.
exports.role_list = async function(req, res, next) {
    const roles = await apiFetch(req, res, `${apiUrl}/roles`);

    var viewData = {
        title: 'All Roles',
        page: 'rolePage',
        display: 'roleList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        roles: roles.data,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Roles list renders successfully");
};

// READ ONE ROLE.
exports.role_detail = async function(req, res, next) {
    var id = req.params.role_id;
    const role = await apiFetch(req, res, `${apiUrl}/role/${id}`);

    var viewData = {
        title: 'Role Details',
        page: 'rolePage',
        display: 'roleDetail',
        parent: 'Role List',
        parentUrl: '/roles',
        role: role.data,
        id: id,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Role details renders successfully");
};

 