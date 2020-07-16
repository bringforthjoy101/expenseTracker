function checkExpenseStatus (req, res, expenseStatus) {
console.log('this is the inputed status ' + `${expenseStatus}`);
  if (expenseStatus == 'Pending') {
    
        return expenseStatus;
        
    } else {
        console.log('Operation denied, expense reviewed already!');
        console.log('this is the status: ' + expenseStatus);
        return res.status(401).send({
            status: false,
            message: 'Operation declined, expense reviewed already! ' + expenseStatus
        });
    }
  
}

module.exports = checkExpenseStatus;