	const submitBtn = document.getElementById('roleSubmitBtn');
	
	submitBtn.addEventListener('click', () => {
	    submitBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
	});
	
	const submitRole = async (event, currentBusinessId) => {
	    try {
	        event.preventDefault();
	        const form = document.getElementById('createRole');
	        const formData = {
	            role_name: form.role_name.value,
	            current_business: currentBusinessId,
	        }
	
	        console.log(formData);
	
	        const role = await createRole(formData);
	        let errors = '';
	        console.log(role);
	        if (role.status) {
	            swal.fire(
	                'Awesome!',
	                'Role created!',
	                'success'
	            )
	            location.href = `/roles`;
	        } else {
	            submitBtn.innerHTML = 'Create';
	            for (let i = 0; i < role.errors.length; i++) {
	                errors += role.errors[i].msg;
	                if (i < role.errors.length - 1) errors += ', ';
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
	
	const createRole = async (data) => {
	    console.log(data)
	    try {
	        const role = await fetch(`${Route.apiRoot}/role/create`, {
	            // mode: 'no-cors',
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(data)
	        });
	        return await role.json();
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