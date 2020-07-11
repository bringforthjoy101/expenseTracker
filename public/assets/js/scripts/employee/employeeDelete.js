const deleteEmployee = async (employeeId) => {
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
			          location.href = `/allEmployees`;
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