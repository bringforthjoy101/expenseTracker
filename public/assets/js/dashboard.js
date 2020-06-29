
// Displays the table for all exenses
const getDashboardData = async (userId) =>{
  try {
    const expenses = await fetch(`${Route.apiRoot}`, {
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
  const data = await getDashboardData();
  const expenses = data.expenses;
  console.log(data)
  
	// paginated table
		var datatable = $('.kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'local',
				source: expenses,
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

const insertExpenseCount = async (userId) => {
  const data = await getDashboardData();
  const expenseCount = data.expenseCount;
  console.log(expenseCount)
  document.getElementById('expenseCount').innerHTML = `
    <span class="kt-widget-3__content-number" id="expenseCount">${ expenseCount}</span>
  `;  
};

const insertEmployeeCount = async (userId) => {
  const data = await getDashboardData();
  const employeeCount = data.employeeCount;
  console.log(employeeCount)
  document.getElementById('employeeCount').innerHTML = `
    <span class="kt-widget-3__content-number" id="employeeCount">${ employeeCount}</span>
  `;  
};

const insertTotalSum = async (userId) => {
  const data = await getDashboardData();
  const totalSum = data.totalSum;
  console.log(totalSum)
  document.getElementById('totalSum').innerHTML = `
    <span class="kt-widget-3__content-bedge">₦</span>
    <span class="kt-widget-3__content-number" id="totalSum">${Number (totalSum || 0).toLocaleString()}</span>
  `;  
};

// number.toLocaleString()
// Number(${totalSum}).toLocaleString()

// ${Number (totalSum || 0).toLocaleString()}