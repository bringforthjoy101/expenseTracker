
// Displays the table for all exenses
const getTypeList = async (userId) =>{
  try {
    const types = await fetch(`${Route.apiRoot}/types`, {
      // mode: 'no-cors',
      method: 'GET',
    });
    return await types.json();
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

const insertTypeList = async (userId) => {
  const data = await getTypeList();
  const types = data.data;
  console.log(data)
  
	// paginated table
		var datatable = $('.kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'local',
				source: types,
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
          field: 'type',
          title: 'Type',
          template: function(row) {
            return `<a href="/type/` + row["id"] + `">` + row["type_name"] + `</a>`
          },
        }, 
        {
			field: 'createdAt',
			title: 'Time Created',
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

const getTypeData = async (id) =>{
  try {
    const response = await fetch(`${Route.apiRoot}/type/${id}`, {
      method: 'GET',
    });
    let typeData = await response.json();
    return typeData;
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

const insertTypeData = async (id) =>{
  const typeData = await getTypeData(id);
  if (typeData.status) {
    try {
      const type = typeData.data;
      
      console.log(type)
      document.getElementById('typeDetail').innerHTML = `
        
            <div class="kt-portlet">
                <div class="kt-portlet__head">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">${type.type_name}</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    
                </div>
            </div>

        `;

    } catch (err) {
      console.log(err);
      document.getElementById('typeDetail').innerHTML = `
        <div class="kt-portlet__body" id="typeDetail">
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
    document.getElementById('typeDetail').innerHTML = `
      <div class="kt-portlet__body" id="typeDetail">
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

const insertTypeExpenseList = async (id) => {
  const typeData = await getTypeData(id);
  const type = typeData.data;
  console.log(type.Expenses)
  
	// paginated table
		var datatable = $('.kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'local',
				source: type.Expenses,
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
        // {
        //   field: 'user',
        //   title: 'Employee',
        //   template: function(row) {
        //     return row.user["firstname"] + ' ' + row.user["lastname"];
        //   }
        // }, 
    //     {
				// 	field: 'createdAt',
				// 	title: 'Time',
				// 	template: function(row) {
				// 	  return moment(row["createdAt"]).fromNow();
    //         // return row["createdAt"];
    //       }
				// // 	type: 'number',
    // //       width: 100,
    //     }
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
