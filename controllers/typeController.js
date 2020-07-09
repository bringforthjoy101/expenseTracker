const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const apiFetch = require('../helpers/apiFetch');

// LIST ALL TYPES.
exports.type_list = async function(req, res, next) {
    const types = await apiFetch(req, res, `${apiUrl}/types`);

    var viewData = {
        title: 'All types',
        page: 'typePage',
        display: 'typeList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        types: types.data,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Types list renders successfully");
};

// READ ONE TYPE.
exports.type_detail = async function(req, res, next) {
    var id = req.params.type_id;
    const type = await apiFetch(req, res, `${apiUrl}/type/${id}`);

    var viewData = {
        title: 'Type Details',
        page: 'typePage',
        display: 'typeDetail',
        parent: 'Type List',
        parentUrl: '/types',
        type: type.data,
        id: id,
        user: req.user,
        moment: moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Type details renders successfully");
};

 