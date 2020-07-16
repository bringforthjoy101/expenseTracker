const profileEditBtn = document.getElementById('profileEditBtn');
  const profileForm = document.querySelector('form#profileEditForm');
  const passwordEditBtn = document.getElementById('passwordEditBtn');
  const passwordForm = document.querySelector('form#passwordEditForm');

  profileEditBtn.addEventListener('click', async ()=> {
    profileEditBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';

    });
    const updateProfile = async (userId) => {    
    try {
      
      const form = document.getElementById('profileEditForm');
      const formData = {
              firstname: form.firstname.value,
              lastname: form.lastname.value,
              username: form.username.value,
              email: form.email.value,
            }
        
      // const formData = new FormData()
     
      
        // if (document.getElementById('avatar').files.length === 0) {
          // const file = 'false'
          
          // formData.append('firstname', profileForm.firstname.value)
          // formData.append('lastname', profileForm.lastname.value)
          // formData.append('username', profileForm.username.value)
          // formData.append('email', profileForm.email.value)
          // formData.append('department', profileForm.department.value)
          // formData.append('role', profileForm.role.value)
        // } else {
        //   const file = 'true'
        //   formData.append('file', file)
        //   formData.append('avatar', profileForm.avatar.files[0])
        //   formData.append('firstname', profileForm.firstname.value)
        //   formData.append('lastname', profileForm.lastname.value)
        //   formData.append('username', profileForm.username.value)
        //   formData.append('email', profileForm.email.value)
        //   formData.append('department', profileForm.department.value)
        //   formData.append('role', profileForm.role.value)
        // }

      
      
      let errors = '';
      const response = await profileEdit(formData, userId);
      console.log('the status is ' + response.data)
      if (response.status){
        swal.fire(
          'Awesome!',
          'Your profile information has been changed successfully!',
          'success'
        )
        location.href = `/profile`;
      } else {
        profileEditBtn.innerHTML = 'Submit';
        console.log(response)
        if (response.message) {
          document.getElementById('errDisplay').innerHTML = response.message;
        } else {
          // for (let i = 0; i < response.errors.length; i++) {
          //   errors += response.errors[i].msg;
          //   if (i < response.errors.length - 1) errors += ', ';
          // }
          // console.log(errors);
          // document.getElementById('errDisplay').innerHTML = errors;
          console.log('expense error ' + response.errors);
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
          response.errors.forEach(error => {
            toastr.error(error.msg);  
          });
        }
        // swal.fire(
        //   'Oops!',
        //   `Profile change was unsuccessful!`,
        //   'error'
        // )
        
        
      }
    } catch (err){
      profileEditBtn.innerHTML = 'Submit';
      console.log(err);
      swal.fire(
        'Oops!',
        `An error occured, please retry!`,
        'error'
      )
    }
}
  const profileEdit = async (data,userId) => {
    console.log(data)
    try {
      const employee = await fetch(`${Route.apiRoot}/employee/${userId}/update`, {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await employee.json();
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
  
  

  passwordEditBtn.addEventListener('click', async ()=> {
    passwordEditBtn.innerHTML = '<i class="kt-spinner kt-spinner--md kt-spinner--center px-4 kt-spinner--light"></i>';
    try {
      const formData = {
        oldPassword: passwordForm.oldPassword.value,
        newPassword: passwordForm.newPassword.value,
        confirmPassword: passwordForm.confirmPassword.value
      }
      let errors = '';
      const response = await passwordEdit(formData);
      if (response.status){
        swal.fire(
          'Awesome!',
          'Your password has been changed successfully!',
          'success'
        )
        location.href = `/dashboard/profile`;
      } else {
        passwordEditBtn.innerHTML = 'Submit';
        console.log(response)
        if (response.message) {
          document.getElementById('errDisplay').innerHTML = response.message;
        } else {
          for (let i = 0; i < response.errors.length; i++) {
            errors += response.errors[i].msg;
            if (i < response.errors.length - 1) errors += ', ';
          }
          console.log(errors);
          document.getElementById('errDisplay').innerHTML = errors;
        }
        swal.fire(
          'Oops!',
          `Password change was unsuccessful!`,
          'error'
        )
      }
    } catch (err){
      passwordEditBtn.innerHTML = 'Submit';
      console.log(err);
      swal.fire(
        'Oops!',
        `An error occured, please retry!`,
        'error'
      )
    }
    });

  const passwordEdit = async (data) => {
    console.log(data)
    try {
      const task = await fetch(`${Route.apiRoot}/user/${userId}/password/update`, {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await task.json();
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