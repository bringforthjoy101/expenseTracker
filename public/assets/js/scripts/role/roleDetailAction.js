  const deleteRole = async (roleId) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "Your action cannot be reversible!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
      }).then(async (result) => {
          if (result.value) {
              try {
                  const role = await fetch(`${Route.apiRoot}/role/${roleId}/delete`, {
                      // mode: 'no-cors',
                      method: 'POST'
                  });
                  let response = await role.json();
                  if (response.status) {
                      swal.fire(
                          'Sucessful!',
                          'Department deleted successfully!',
                          'success'
                      )
                      location.href = `/roles`;
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
  
  const deleteEmployee = async (employeeId, roleId) => {
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
                  const employee = await fetch(`${Route.apiRoot}/employee/${employeeId}/delete`, {
                      // mode: 'no-cors',
                      method: 'POST'
                  });
                  let response = await employee.json();
                  if (response.status) {
                      swal.fire(
                          'Sucessful!',
                          'Employee deleted successfully!',
                          'success'
                      )
                      location.href = `/role/${roleId}`;
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
  
  async function action(roleId, userRole) {
      try {
  
          if (`${userRole}` == 'Manager') {
              document.getElementById('action').innerHTML = `
              <div class="dropdown dropdown-block text-right">
                  <span class="d-inline-block" tabindex="0" data-toggle="kt-tooltip" data-skin="brand" title="More options">
                      <button type="button" class="btn btn-hover-brand btn-elevate-hover btn-icon btn-sm btn-icon-md btn-circle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="flaticon-more-1"></i>
                      </button>
                		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="userAction">
                      <a class="dropdown-item text-danger" onclick="deleteRole(${roleId})">Delete</a>    
                		</div>
                	</span>
          	</div>
        	  
          `;
          }
      } catch (error) {
          console.log('this is the error ' + error);
      }
  }