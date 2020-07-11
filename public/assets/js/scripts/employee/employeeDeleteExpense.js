const deleteExpense = async (expenseId)=>{
	Swal.fire({
    title: 'Are you sure?',
    text: "Your action cannot be reversible!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete it!'
    }).then( async (result) => {
        if (result.value) {
            try {
              const expense = await fetch(`${Route.apiRoot}/expense/${expenseId}/delete`, {
                // mode: 'no-cors',
                method: 'POST'
              });
              let response = await expense.json();
              if (response.status) {
                swal.fire(
                    'Sucessful!',
                    'Expense deleted successfully!',
                    'success'
                  )
                  location.reload()
                //   location.href = `/employee/${employeeId}`;
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
        }
    });
}