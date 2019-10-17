$(document).ready(function () {
	
	loadOrganizations();

	// $('#confirm-add-location').click(function (event) {

	//     $.ajax({
	//       type: 'POST',
	//       url: 'http://localhost:8080/location',
	//       data: JSON.stringify({
	//         name: $('#add-location-name').val(),
	//         description: $('#add-location-description').val(),
	//         street: $('#add-location-street').val(),
	//         city: $('#add-location-city').val(),
	//         state: $('#add-location-state').val(),
	//         zip: $('#add-location-zip').val(),
	//         latitude: $('#add-location-latitude').val(),
	//         longitude: $('#add-location-longitude').val()
	//       }),
	//       headers: {
	//         'Accept': 'application/json',
	//         'Content-Type': 'application/json'
	//       },
	//       'dataType': 'json',
	//       success: function() {
	//         $('#errorMessages').empty();
	//         $('#add-location-name').val('');
	//         $('#add-location-description').val('');
	//         $('#add-location-street').val('');
	//         $('#add-location-city').val('');
	//         $('#add-location-state').val('');
	//         $('#add-location-zip').val('');
	//         $('#add-location-latitude').val('');
	//         $('#add-location-longitude').val('');
	//         loadLocations();
	//       },
	//       error: function() {
	//         $('#errorMessages')
	//           .append($('<li>')
	//           .attr({class: 'list-group-item list-group-item-danger'})
	//           .text('Error calling web service. Please try again later.'));
	//       }
	//     });
 //    });


    // $('#edit-update-button').click(function (event) {

    //     // check for errors and display any that we have
    //     // pass the input associated with the edit form to the validation function
    //     //var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));

    //     // if we have errors, bail out by returning false
    //     // if (haveValidationErrors) {
    //     //     return false;
    //     // }

    //     // if we get to here, there were no errors, so make the Ajax call
    //     $.ajax({
    //         type: 'PUT',
    //         url: 'http://localhost:8080/location/' + $('#edit-location-id').val(),
    //         data: JSON.stringify({
    //         id: $('#edit-location-id').val(),
    //         name: $('#edit-location-name').val(),
	   //      description: $('#edit-location-description').val(),
	   //      street: $('#edit-location-street').val(),
	   //      city: $('#edit-location-city').val(),
	   //      state: $('#edit-location-state').val(),
	   //      zip: $('#edit-location-zip').val(),
	   //      latitude: $('#edit-location-latitude').val(),
	   //      longitude: $('#edit-location-longitude').val()
    //        }),
    //        headers: {
    //          'Accept': 'application/json',
    //          'Content-Type': 'application/json'
    //        },
    //        'dataType': 'json',
    //         success: function() {
    //             // clear errorMessages
    //             $('#errorMessages').empty();
    //             hideEditForm();
    //             loadLocations();
    //        },
    //        error: function(jqxhr, errortext, errorthrown) {
    //        		console.log(jqxhr);
    //        		console.log(errortext);
    //        		console.log(errorthrown);
    //          $('#errorMessages')
    //             .append($('<li>')
    //             .attr({class: 'list-group-item list-group-item-danger'})
    //             .text('Error calling web service.  Please try again later.'));
    //        }
    //    })
    // });

});

function loadOrganizations() {
	clearOrganizationsTable();
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/orgs',
		success: function(orgArray) {
			$.each(orgArray, function(index, org) {
				var name = org.name;
				var description = org.description;
				var hotline = org.hotline;
				var orgId = org.id;
        var superArray = org.members;
        console.log(superArray);

				var row = '<tr>';
					  row += '<td>' + name + '</td>';
				  	row += '<td>' + description + '</td>';
					  row += '<td>' + hotline + '</td>';

            // inserting unique Member List modaks
            row += '<td><a data-toggle="modal" data-target="#testModal' + orgId + '">Members</a>';
            row += '<div class="modal" id="testModal' + orgId + '" tabindex="-1" role="dialog">';
            row += '<div class="modal-dialog" role="document">';
            row += '<div class="modal-content">';
            row += '<div class="modal-header">';
            row += '<h2 class="modal-title">Members List</h2>';
            row += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
            row += '<span aria-hidden="true">&times;</span>';
            row += '</button></div>';
            row += '<div class="modal-body">';
            row += '<ol>';
            //retrieve members
            $.each(superArray, function(index, member){
              row += '<li>' + member.name+ '</li>';
            });
            row += '</ol>';
            row += '</div><div class="modal-footer">';
            row += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            row += '</div></div></div></div></td>';
            // end of Modal

					  row += '<td><a onclick="showEditForm(' + orgId + ')">Edit</a></td>';
					  row += '<td><a onclick="deleteOrganization(' + orgId + ', \'' + name + '\')">Delete</a></td>';
					  row += '</tr>';

				contentRows.append(row);
			});
		},
		error: function(jqxhr, errortext, errorthrown) {
			console.log(jqxhr);
       		console.log(errortext);
       		console.log(errorthrown);
			$('#errorMessages')
				.append($('<li>')
				.attr({class: 'list-group-item list-group-item-danger'})
				.text('Error calling web service. Please try again later.'));
		}
	});
}

function clearOrganizationsTable() {
	$('#contentRows').empty();
}

function deleteLocation(orgId, name) {
    if(!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
    	return;
    }
    $.ajax ({
        type: 'DELETE',
        url: "http://localhost:8080/org/" + orgId,
        success: function (status) {
            loadOrganizations();
        }
    });
}

// function showEditForm(sightingId) {
//     // clear errorMessages
//     $('#errorMessages').empty();
//     // get the contact details from the server and then fill and show the
//     // form on success
//     $.ajax({
//         type: 'GET',
//         url: 'http://localhost:8080/contact/' + contactId,
//         success: function(data, status) {
//               $('#edit-first-name').val(data.firstName);
//               $('#edit-last-name').val(data.lastName);
//               $('#edit-company').val(data.company);
//               $('#edit-email').val(data.email);
//               $('#edit-phone').val(data.phone);
//               $('#edit-contact-id').val(data.contactId);
//           },
//           error: function() {
//             $('#errorMessages')
//                .append($('<li>')
//                .attr({class: 'list-group-item list-group-item-danger'})
//                .text('Error calling web service.  Please try again later.'));
//           }
//     });
//     $('#contactTableDiv').hide();
//     $('#editFormDiv').show();
// }

// function showEditForm(locationId) {
//     // clear errorMessages
//     $('#errorMessages').empty();
//     // get the contact details from the server and then fill and show the
//     // form on success
//     $.ajax({
//         type: 'GET',
//         url: 'http://localhost:8080/location/' + locationId,
//         success: function(data, status) {
//               $('#edit-location-name').val(data.name);
//               $('#edit-location-description').val(data.description);
//               $('#edit-location-street').val(data.street);
//               $('#edit-location-city').val(data.city);
//               $('#edit-location-state').val(data.state);
//               $('#edit-location-zip').val(data.zip);
//               $('#edit-location-latitude').val(data.latitude);
//               $('#edit-location-longitude').val(data.longitude);
//               $('#edit-location-id').val(data.id);
//           },
//           error: function() {
//             $('#errorMessages')
//                .append($('<li>')
//                .attr({class: 'list-group-item list-group-item-danger'})
//                .text('Error calling web service.  Please try again later.'));
//           }
//     });
//     $('#locationTableDiv').hide();
//     $('#editFormDiv').show();
// }

// function hideEditForm() {
//     // clear errorMessages
//     $('#errorMessages').empty();
//     // clear the form and then hide it
//     $('#edit-location-name').val('');
//     $('#edit-location-description').val('');
//     $('#edit-location-street').val('');
// 	  $('#edit-location-city').val('');
// 	  $('#edit-location-state').val('');
// 	$('#edit-location-zip').val('');
// 	$('#edit-location-latitude').val('');
// 	$('#edit-location-longitude').val('');
// 	$('#edit-location-id').val('');
//     $('#editFormDiv').hide();
//     $('#locationTableDiv').show();
    
// }