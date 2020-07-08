var models = require('../models');

module.exports = (req, res, next) => {
    var thisExpense = models.Expense.findById(req.params.expense_id);
    if (thisExpense.status !== 'Pending') {
        console.log('Operation denied, expense reviewed already!');
        return res.status(401).send({
            status: false,
            message: 'Operation declined, expense reviewed already! ' + thisExpense.id
        });
    }
    next();
};