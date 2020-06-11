var models = require('../models');

module.exports = (req, res, next) =>  {
    if(!req.user) {
        console.log('Un authtorised user trying to access the site')
        return res.status(401).send({error: 'You must be logged in'});
      }

    const thisExpense =  models.Expense.findById(req.params.expense_id);

    if(req.user.roleId !== 1 && req.user.DepartmentId !== thisExpense.DepartmentId) {
     console.log('Un authtorised user trying to access the site')
     return res.status(401).send({error: 'Permission denied! '});
   }
  next();
  
};