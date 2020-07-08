function checkExpenseStatus (req, res, expenseStatus) {

  if (expenseStatus !== 'Pending') {
        console.log('Operation denied, expense reviewed already!');
        return res.status(401).send({
            status: false,
            message: 'Operation declined, expense reviewed already! ' + expenseStatus
        });
    }
  
  return expenseStatus;
  
}

module.exports = checkExpenseStatus;