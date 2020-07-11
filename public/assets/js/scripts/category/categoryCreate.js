const submitBtn = document.getElementById('categorySubmitBtn');
	
	submitBtn.addEventListener('click', () => {
	    submitBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
	});
	
	const submitCategory = async (event, currentBusinessId) => {
	    try {
	        event.preventDefault();
	        const form = document.getElementById('createCategory');
	        const formData = {
	            category_name: form.category_name.value,
	            current_business: currentBusinessId,
	        }
	
	        console.log(formData);
	
	        const category = await createCategory(formData);
	        let errors = '';
	        console.log(category);
	        if (category.status) {
	            swal.fire(
	                'Awesome!',
	                'Category created!',
	                'success'
	            )
	            location.href = `/categories`;
	        } else {
	            submitBtn.innerHTML = 'Create';
	            for (let i = 0; i < category.errors.length; i++) {
	                errors += category.errors[i].msg;
	                if (i < category.errors.length - 1) errors += ', ';
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
	
	const createCategory = async (data) => {
	    console.log(data)
	    try {
	        const category = await fetch(`${Route.apiRoot}/category/create`, {
	            // mode: 'no-cors',
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(data)
	        });
	        return await category.json();
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