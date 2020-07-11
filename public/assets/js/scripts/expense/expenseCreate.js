const expenseSubmitBtn = document.getElementById('expenseSubmitBtn');

expenseSubmitBtn.addEventListener('click', ()=>{
  expenseSubmitBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
});

const submitCreateExpense = async (event, userId, DepartmentId, CurrentBusinessId) => {
	try {
  event.preventDefault();
  //const form = event.target;
  const form = document.getElementById('createExpense');
  const formData = {
          title: form.title.value,
          desc: form.desc.value,
          amount: form.amount.value,
          type: form.type.value,
          category: form.category.value,
          current_business: CurrentBusinessId,
          reviewer: form.reviewer.value,
          department: DepartmentId,
          employee_id: userId,
        }
  
  console.log(formData);
  
  
    const expense = await createExpense(formData);
    let errors = '';
    console.log(expense);
    if (expense.status) {
      swal.fire(
        'Awesome!',
        'Expense created!',
        'success'
      )
      location.href = `/expense/${expense.data.id}`;
    } else {
      submitBtn.innerHTML = 'Submit Expense';
      console.log(expense.errors);
      
      toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    expense.errors.forEach(error => {
      toastr.error(error.msg);  
    });
    
    }
  } catch (error) {
    console.log(error);
    // show network error notification
    swal.fire(
      'Oops!',
      'An error was encountered! Please review your network connection.',
      'error'
    )
  }

};

const createExpense = async (data) => {
    console.log(data)
    try {
      const expense = await fetch(`${Route.apiRoot}/expense/create`, {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await expense.json();
    } catch (error) {
      console.log(error);
      // show network error notification
      swal.fire(
        'Oops!',
        'An error was encountered! Please review your network connection.',
        'error'
      )
    }
  };