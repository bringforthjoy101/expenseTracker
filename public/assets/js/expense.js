// const Route = new Routes;

// Displays the data for a single expense
const getExpenseData = async (id) =>{
  try {
    const response = await fetch(`${Route.apiRoot}/expense/${id}`, {
      // mode: 'no-cors',
      method: 'GET',
    });
    let expenseData = await response.json();
    return expenseData;
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

const insertExpenseData = async (id) =>{
  const expenseData = await getExpenseData(id);
  if (expenseData.status) {
    try {
      const expense = expenseData.data;
      console.log('this is the expense status ' + expense.status )
      var type = (expense.status == 'Approved') ? 'success' 
          : (expense.status == 'Pending') ? 'warning' 
          : (expense.status == 'Declined') ? 'danger'
          : null;
      
      console.log(expense)
      document.getElementById('expenseDetail').innerHTML = `
        
            <div class="kt-portlet">
                <div class="kt-portlet__head">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">${expense.title}</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-section">
                        <div class="kt-section__info">
                            ${expense.desc} <br>
                            <b>₦ ${Number (expense.amount || 0).toLocaleString()}</b> <br>
                             <span class="badge badge-${type}">${ expense.status }</span> <br>
                            ${ moment(expense.createdAt).fromNow() }
                        </div>
                    </div>
                </div>
            </div>

            <!--end::Portlet-->

            <!--begin::Portlet-->
            <div class="kt-portlet">
                <div class="kt-portlet__head">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">Expense Details</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-section">
                        <div class="kt-section__info">
                            <b>Type:</b> ${ expense.Type.type_name } <br>
                            <b>Category:</b> ${ expense.Category.category_name } <br>
                            <b>Employee:</b> ${ expense.user.firstname } <br>
                            <b>Department:</b> ${ expense.Department.dept_name } <br>
                        </div>
                    </div>
                </div>
            </div>

        `;
        

    } catch (err) {
      console.log(err);
      document.getElementById('expenseDetail').innerHTML = `
        <div class="kt-portlet__body" id="expenseDetail">
          <div class="">
            <div class="kt-widget__label">
              <span class="kt-widget__desc">
                <h5>An Error Occured, please refresh page this.</h5>
              </span>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    document.getElementById('expenseDetail').innerHTML = `
      <div class="kt-portlet__body" id="expenseDetail">
        <div class="">
          <div class="kt-widget__label">
            <span class="kt-widget__desc">
              <h5>An Error Occured, please refresh page.</h5>
            </span>
          </div>
        </div>
      </div>
    `;
  }

}



// const insertListData = async (userId ) => {
//   const { data } = await getExpenseList(userId);
//   console.log(data)
//   // access DOM
//   const itemsList = document.getElementById('itemsList');
//   if (itemsList) {
//     itemsList.innerHTML = '';
//     if (data != 'None') {
//       data.forEach(expense => {
//           var type = (expense.status == 'Approved') ? 'success' 
//           : (expense.status == 'Pending') ? 'warning' 
//           : (expense.status == 'Declined') ? 'danger'
//           : null;
          
//         itemsList.innerHTML += `
//           <tr>
// 			<td>${expense.id}</td>
// 			<td><a href="/expense/${expense.id}">${expense.title}</a></td>
// 			<td>₦ ${ Number (expense.amount || 0).toLocaleString() }</td>
// 			<td><span class="kt-badge kt-badge--${type} kt-badge--inline kt-badge--pill">${expense.status}</span></td>
// 			<td>${expense.user.firstname} ${expense.user.lastname}</td>
// 			<td>${ moment(expense.createdAt).fromNow()}</td>
// 			<td nowrap> 
// 				<a href="/expense/${expense.id}" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="View">
// 					<i class="la la-eye"></i>
// 				</a>
// 				<a href="/expense/${expense.id}/update" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit">
// 				  <i class="la la-edit"></i>
// 				</a>
// 				<a href="/expense/${expense.id}/delete" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">
// 					<i class="la la-trash"></i>
// 				</a>
				
// 			</td>
// 		</tr>
//         `
//       });
//     } else {
//       itemsList.innerHTML += `
//           <div class="list-group-item list-group-item-action flex-column align-items-start">
//             <div class="d-flex w-100 justify-content-between">
//               <h5 class="mb-1">No Expense Found.</h5>
//             </div>
//             <p class="mb-1">Oops, none found!</p>
//           </div>
//         `
//     }
//   }

  
// };

// Displays the table for all exenses
const getExpenseList = async (userId) =>{
  try {
    const expenses = await fetch(`${Route.apiRoot}/expenses`, {
      // mode: 'no-cors',
      method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ userId })
    });
    return await expenses.json();
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

const insertExpenseList = async (userId) => {
  const { data } = await getExpenseList();
  console.log(data)
  
	// paginated table
		var datatable = $('.kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'local',
				source: data,
				pageSize: 15,
			},

			// layout definition
			layout: {
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				footer: false // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch')
			},

			// columns definition
			columns: [
        // {
				// 	field: 'UserId',
        //   title: '#',
        //   width: 60,
				// 	type: 'number',
        // },
        {
          field: 'title',
          title: 'Title',
          template: function(row) {
            return `<a href="/expense/` + row["id"] + `">` + row["title"] + `</a>`
          },
        }, 
        {
          field: 'amount',
          title: 'Amount',
          template: function(row) { 
            return `₦` + Number(row["amount"]).toLocaleString()
          },
          type: 'number',
        },
        {
          field: 'status',
          title: 'Status',
          template: function(row) {
            var type = (row["status"] == 'Approved') ? 'success' 
              : (row["status"] == 'Pending') ? 'warning' 
              : (row["status"] == 'Declined') ? 'danger'
              : null;
            return `<span class="kt-badge kt-badge--${type} kt-badge--inline kt-badge--pill">` + row["status"] + `</span>`
          }
        },
        {
          field: 'user',
          title: 'Employee',
          template: function(row) {
            console.log('this is the user ' + row['Type.type_name']);
            return row["user.firstname"] + ' ' + row["user.lastname"];
            
          }
        }, 
        {
					field: 'createdAt',
					title: 'Time',
					template: function(row) {
					  return moment(row["createdAt"]).fromNow();
            // return row["createdAt"];
          }
				// 	type: 'number',
    //       width: 100,
        }
      ],

		});

    $('#kt_form_status').on('change', function() {
      datatable.search($(this).val().toLowerCase(), 'status');
    });

    $('#kt_form_type').on('change', function() {
      datatable.search($(this).val().toLowerCase(), 'type');
    });

    $('#kt_form_status,#kt_form_type').selectpicker();

};

