var models = require('../models');

module.exports = (req, res, next) => {
    // if (req.params.employee_id)
    
    console.log('this is the params ' + req.params);
    var thisEmployee = models.Employee.findById(req.params.employee_id);
    if (req.user.DepartmentId == thisEmployee.DepartmentId) {
        return res.status(401).send({
            status: false,
            message: 'Operation declined!'
        });
    }
    next();
};