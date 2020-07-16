function checkExpenseStatus (req, res, expenseStatus) {
console.log('this is the inputed status ' + `${expenseStatus}`);
  if (expenseStatus != 'Pending') {
        console.log('Operation denied, expense reviewed already!');
        return res.status(401).send({
            status: false,
            message: 'Operation declined, expense reviewed already! ' + expenseStatus
        });
    }
    console.log('Operation denied, expense reviewed already!');
    console.log('this is the status: ' + expenseStatus);
  
  return expenseStatus;
  
}

module.exports = checkExpenseStatus;