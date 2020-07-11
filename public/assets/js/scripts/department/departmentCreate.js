	const submitBtn = document.getElementById('departmentSubmitBtn');
	
	submitBtn.addEventListener('click', () => {
	    submitBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
	});
	
	const submitDepartment = async (event, currentBusinessId) => {
	    try {
	        event.preventDefault();
	        const form = document.getElementById('createDepartment');
	        const formData = {
	            dept_name: form.dept_name.value,
	            current_business: currentBusinessId,
	        }
	
	        console.log(formData);
	
	        const department = await createDepartment(formData);
	        let errors = '';
	        console.log(department);
	        if (department.status) {
	            swal.fire(
	                'Awesome!',
	                'Department created!',
	                'success'
	            )
	            location.href = `/departments`;
	        } else {
	            submitBtn.innerHTML = 'Create';
	            for (let i = 0; i < department.errors.length; i++) {
	                errors += department.errors[i].msg;
	                if (i < department.errors.length - 1) errors += ', ';
	            }
	            console.log(errors);
	            document.getElementById('errDisplay').innerHTML = errors;
	            swal.fire(
	                'Oops!',
	                `Operation was not successful!`,
	                'error'
	            )
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
	
	const createDepartment = async (data) => {
	    console.log(data)
	    try {
	        const department = await fetch(`${Route.apiRoot}/department/create`, {
	            // mode: 'no-cors',
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(data)
	        });
	        return await department.json();
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