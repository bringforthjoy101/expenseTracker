const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');

// Display list of all roles.
exports.role_list = async function(req, res, next) {
    const data = await fetch(`${apiUrl}/roles`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const roles = await data.json();
    
    var viewData = {
        title: 'All Roles',
        page:'rolePage',
        display:'roleList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        api: 'role',
        roles: roles.data,
        user: req.user,
        moment:moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Roles list renders successfully");
};

// Display detail page for a specific role.
exports.role_detail = async function(req, res, next) {
    var id = req.params.role_id;
    const data = await fetch(`${apiUrl}/role/${id}`, {
        method: 'GET',
        headers:{
          cookie: req.headers.cookie,
        }
    });
    const role = await data.json();
    console.log('this is role ' + role);

    var viewData = {
        title: 'Role Details',
        page:'rolePage',
        display:'roleDetail',
        parent: 'Role List',
        parentUrl: '/roles',
        api: 'role',
        role: role.data,
        id: id,
        user: req.user,
        moment: moment, 
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Role details renders successfully");
};

 