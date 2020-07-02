var Type = require('../models/type');
var models = require('../models');
const fetch = require('node-fetch');
const moment = require('moment');
const apiUrl = require('../helpers/apiUrl');
const { check, validationResult } = require('express-validator');

// Handle type create on POST.
exports.type_create_post = [
    [
      // Validation for inputs
      check('type_name')
      .isLength({ min: 3, max: 50 }).withMessage('Type name must be between 3 and 50 characters long')
      .not().isEmpty().withMessage('Type name cannot be empty')
      .matches(/^[A-Za-z\s]+$/).withMessage('Type name must contain only Letters.')
    ],
    function(req, res, next) {
        // checks for validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, errors: errors.array() });
        }
        try {
            models.Type.create({
                type_name: req.body.type_name
            }).then(function(type) {
                  res.status(200).json({
                    status: true,
                    data: type,
                    message: 'Type created successfully'
                  })
                    console.log("Type created successfully");
              });
           
        } catch (error) {
            // check if there was an error during operation
            res.status(400).json({
              status: false,
              message: `There was an error - ${error}`
            });
        }
    }
];


// Handle type delete on POST.
exports.type_delete_post = async function(req, res, next) {
    var type_id = req.params.type_id
    // validates if the department ID is an integer
    if (isNaN(Number(type_id))) {
        return res.status(400).json({
          status: false,
          message: 'Invalid Type ID'
        });
    }
    // checks if the ID exists
    const thisType = await models.Type.findById(type_id);
    if (!thisType) {
      return res.status(400).json({
          status: false,
          message: 'Type ID not found'
        });
    }
    // performs operation
    try {
        models.Type.destroy({
            // find the type_id to delete from database
            where: {
              id: type_id
            }
          }).then(function(type) {
           // If an type gets deleted successfully, we just redirect to comments list
           // no need to render a page
           res.status(200).json({
            status: true,
            message: 'Type deleted successfully'
          })
            console.log("Type deleted successfully");
          });
    } catch (error) {
        // check if there was an error during operation
        res.status(400).json({
          status: false,
          message: `There was an error - ${error}`
        });
    }
};

// Display list of all types.
exports.type_list = async function(req, res, next) {
    
    
    var viewData = {
        title: 'All types',
        page:'typePage',
        display:'typeList',
        parent: 'Dashboard',
        parentUrl: '/dashboard',
        api: 'type',
        user: req.user,
        moment:moment,
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expenses list renders successfully");
};

// Display detail page for a specific type.
exports.type_detail = async function(req, res, next) {
    var id = req.params.type_id;
    const data = await fetch(`${apiUrl}/type/${id}`, {method: 'GET'});
    const type = await data.json();
    console.log('this is type ' + type);

    var viewData = {
        title: 'Type Details',
        page:'typePage',
        display:'typeDetail',
        parent: 'Type List',
        parentUrl: '/types',
        api: 'type',
        type: type.data,
        id: id,
        user: req.user,
        moment: moment, 
        layout: 'layouts/main'
    }
    res.render('pages/index', viewData);
    console.log("Expense one details renders successfully");
};

 