const submitBtn = document.getElementById('expenseUpdateBtn');

submitBtn.addEventListener('click', () => {
    submitBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
});

const submitExpense = async (event, expenseId) => {
    try {
        event.preventDefault();
        //const form = event.target;
        const form = document.getElementById('updateExpense');
        const formData = {
            title: form.title.value,
            desc: form.desc.value,
            amount: form.amount.value,
            type: form.type.value,
            category: form.category.value,
        }

        console.log(formData);

        let errors = '';
        const expense = await updateExpense(formData, expenseId);
        // console.log(expense);
        if (expense.status) {
            swal.fire(
                'Awesome!',
                'Expense updated!',
                'success'
            )
            // location.href = `/expense/${expenseId}`;
            // location.reload()
        } else {
            submitBtn.innerHTML = 'Update Expense';
            
            console.log('expense error ' + expense.errors);
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
const updateExpense = async (data, expenseId) => {
    console.log('this is the data ' + expenseId)
    try {
        const expense = await fetch(`${Route.apiRoot}/expense/${expenseId}/update`, {
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
const deleteExpense = async (expenseId) => {
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
            location.href = `/expenses`;
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

const onActionCompleted = (approval) => {
    if (approval.status) {
        swal.fire(
            'Awesome!',
            'Operation Successful',
            'success'
        )
        // location.href = `/expense/${expenseId}`;
        location.reload()
    } else {
        swal.fire(
            'Oops!',
            `An error was encountered! Please reload and try again.`,
            'error'
        )
    }
}
const onErrorCatch = (error) => {
    console.log(error);
    // show network error notification
    swal.fire(
        'Oops!',
        'An error was encountered! Please review your network connection.',
        'error'
    )
}

// Review Expense
const approveExpense = async (expenseId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Your action wil approve this expense!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve it!'
    }).then(async (result) => {
        if (result.value) {
            try {
                const response = await fetch(`${Route.apiRoot}/expense/${expenseId}/approval/1`, {
                    method: 'GET',
                });
                const approval = await response.json();
                onActionCompleted(approval);
            } catch (error) {
                onErrorCatch(error);
            }
        }
    })
};
const declineExpense = async (expenseId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Your action wil decline this expense!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Decline it!'
    }).then(async (result) => {
        if (result.value) {
            try {
                const response = await fetch(`${Route.apiRoot}/expense/${expenseId}/approval/2`, {
                    method: 'GET',
                });
                const approval = await response.json();
                onActionCompleted(approval);
            } catch (error) {
                onErrorCatch(error);
            }
        }
    })
};

const expenseAction = async (userId, userRole, expenseId) => {
    try {
        const response = await fetch(`${Route.apiRoot}/expense/${expenseId}`, {
            method: 'GET',
        });
        let expenseData = await response.json();
        const expense = expenseData.data;
        console.log(expense);
        console.log('this is expense user ID ' + expense.userId)
        if (expense.status == 'Pending') {
            if (expense.userId == `${userId}` || `${userRole}` == 'Manager') {
                document.getElementById('expenseAction').innerHTML = `
            <div class="dropdown dropdown-block text-right">
                <span class="d-inline-block" tabindex="0" data-toggle="kt-tooltip" data-skin="brand" title="More options">
                    <button type="button" class="btn btn-hover-brand btn-elevate-hover btn-icon btn-sm btn-icon-md btn-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="flaticon-more-1"></i>
                    </button>
              		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="userAction">
                        
                         
              		</div>
              	</span>
        	</div>
      	  
        `;
                console.log('I am loaded');
                if (userId == expense.userId && expense.status == 'Pending') {
                    document.getElementById('userAction').innerHTML = `
      			<button type="button" class="dropdown-item" data-toggle="modal" data-target="#editExpense">
              Edit
            </button>
            <a class="dropdown-item text-danger" onclick="deleteExpense(${expenseId})">Delete</a>
          `;
                }

                if (userRole == 'Manager') {
                    if (expense.status == 'Pending') {
                        document.getElementById('userAction').innerHTML += `
                <a class="dropdown-item text-success" onclick="approveExpense(${expenseId})">Approve</a>
                <a class="dropdown-item text-danger" onclick="declineExpense(${expenseId})">Decline</a>
                `;
                    } else if (expense.status == 'Approved') {
                        document.getElementById('userAction').innerHTML += `
                <a class="dropdown-item text-danger" onclick="declineExpense(${expenseId})">Decline</a>
                `;
                    } else {
                        document.getElementById('userAction').innerHTML += `
                <a class="dropdown-item text-success" onclick="approveExpense(${expenseId})">Approve</a>
                `;
                    }
                }

            }
        }

    } catch (error) {
        console.log('this is the error ' + error);
    }
};



