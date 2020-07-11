  const deleteType = async (typeId) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "This action cannot be reversible!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
      }).then(async (result) => {
          if (result.value) {
              try {
                  const type = await fetch(`${Route.apiRoot}/type/${typeId}/delete`, {
                      // mode: 'no-cors',
                      method: 'POST'
                  });
                  let response = await type.json();
                  if (response.status) {
                      swal.fire(
                          'Sucessful!',
                          'Type deleted successfully!',
                          'success'
                      )
                      location.href = `/types`;
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
  
  const deleteExpense = async (expenseId, typeId) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "This action cannot be reversible!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
      }).then(async (result) => {
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
                      location.href = `/type/${typeId}`;
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
  
  async function action(typeId, userRole) {
      try {
  
          if (`${userRole}` == 'Manager') {
              document.getElementById('action').innerHTML = `
              <div class="dropdown dropdown-block text-right">
                  <span class="d-inline-block" tabindex="0" data-toggle="kt-tooltip" data-skin="brand" title="More options">
                      <button type="button" class="btn btn-hover-brand btn-elevate-hover btn-icon btn-sm btn-icon-md btn-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="flaticon-more-1"></i>
                      </button>
                		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="userAction">
                          <a class="dropdown-item text-danger" onclick="deleteType(${typeId})">Delete</a>    
                		</div>
                	</span>
          	</div>
        	  
          `;
          }
      } catch (error) {
          console.log('this is the error ' + error);
      }
  }