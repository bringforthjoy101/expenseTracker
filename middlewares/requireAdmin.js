var models = require('../models');

module.exports = (req, res, next) =>  {
    // if(!req.user) {
    //     console.log('Un authtorised user trying to access the site')
    //     return res.status(401).send({error: 'You must be logged in'});
    //   }

    // const thisExpense =  models.Expense.findById(req.params.expense_id);
    
    const manager = models.Role.findAll({
        where: {
          CurrentBusinessId: req.user.CurrentBusinessId,
          role_name: 'Manager'
        },
    });
          
    console.log('this is the manager role id ' + manager[0].id);

    if(req.user.RoleId !== manager[0].id) {
     console.log('Un authtorised user trying to access the site')
     return res.status(401).send({error: 'Permission denied! '});
   }
  next();
  
};