	const submitBtn = document.getElementById('typeSubmitBtn');
	
	submitBtn.addEventListener('click', () => {
	    submitBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
	});
	
	const submitType = async (event, currentBusinessId) => {
	    try {
	        event.preventDefault();
	        const form = document.getElementById('createType');
	        const formData = {
	            type_name: form.type_name.value,
	            current_business: currentBusinessId,
	        }
	
	        console.log(formData);
	
	        const type = await createType(formData);
	        let errors = '';
	        console.log(type);
	        if (type.status) {
	            swal.fire(
	                'Awesome!',
	                'Type created!',
	                'success'
	            )
	            location.href = `/types`;
	        } else {
	            submitBtn.innerHTML = 'Create';
	            for (let i = 0; i < type.errors.length; i++) {
	                errors += type.errors[i].msg;
	                if (i < type.errors.length - 1) errors += ', ';
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
	
	const createType = async (data) => {
	    console.log(data)
	    try {
	        const type = await fetch(`${Route.apiRoot}/type/create`, {
	            // mode: 'no-cors',
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(data)
	        });
	        return await type.json();
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