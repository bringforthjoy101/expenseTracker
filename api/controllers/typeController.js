var Type = require('../../models/type');
var models = require('../../models');
const { check, validationResult } = require('express-validator');

// CREATE TYPE.
exports.type_create_post = [
    [
        // Validation for inputs
        check('type_name')
        .isLength({
            min: 3,
            max: 50
        }).withMessage('Type name must be between 3 and 50 characters long')
        .not().isEmpty().withMessage('Type name cannot be empty')
        .matches(/^[A-Za-z\s]+$/).withMessage('Type name must contain only Letters.'),
        check('current_business')
        .not().isEmpty().withMessage('CurrentBusinessId cannot be empty')
        .isInt().withMessage('CurrentBusinessId must be numeric'),
    ],
    function(req, res, next) {
        // checks for validations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                errors: errors.array()
            });
        }
        try {
            models.Type.create({
                type_name: req.body.type_name,
                CurrentBusinessId: req.body.current_business
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

// DELETE TYPE.
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
            where: {
                id: type_id
            }
        }).then(function(type) {
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

// LIST ALL TYPES.
exports.type_list = function(req, res, next) {
    try {
        models.Type.findAll({
            where: {
                CurrentBusinessId: req.user.CurrentBusinessId
            }
        }).then(function(types) {
            // renders a post list page
            console.log("rendering type list");
            if (types.length === 0) {
                res.status(400).json({
                    status: false,
                    data: 'None',
                    message: 'No Types available'
                })
            } else {
                res.status(200).json({
                    status: true,
                    data: types,
                    message: 'Types Listed successfully'
                })
            }
            console.log("Types list renders successfully");
        });
    } catch (error) {
        // check if there was an error during operation
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

// READ ONE TYPE.
exports.type_detail = async function(req, res, next) {
    var type_id = req.params.type_id
    // validates if the type ID is an integer.
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
    // Performs operation
    try {
        models.Type.findById(
            type_id, {
                include: [{
                    model: models.Expense,
                    attributes: ['id', 'title', 'amount', 'status', 'createdAt'],
                    include: [{
                        model: models.user,
                        attributes: ['firstname', 'lastname', 'name'],
                    }, ]
                }, ],
            }
        ).then(function(type) {
            // renders an inividual type details page
            if (!type) {
                res.status(400).json({
                    status: false,
                    data: 'None',
                    message: 'Type not found'
                });
            } else {
                res.status(200).json({
                    status: true,
                    data: type,
                    message: 'Type details rendered successfully'
                });
            }
            console.log("Type detials renders successfully");
        });
    } catch (error) {
        // check if there was an error during operation
        res.status(400).json({
            status: false,
            message: `There was an error - ${error}`
        });
    }
};

 