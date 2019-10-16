$(document).ready(function () {
	
	loadLocations();

});

function loadLocations() {
	clearSightingsTable();
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/locations',
		success: function(locationArray) {
			$.each(locationArray, function(index, location) {
				var name = location.name;
				var description = location.description;
				var address = location.street;
					address += ', ' + location.city;
					address += ', ' + location.state;
					address += ' ' + location.zip;
				console.log(address);
				var latitude = location.latitude;
				var longitude = location.longitude;
				var locationId = location.id;


				var row = '<tr>';
					row += '<td>' + name + '</td>';
					row += '<td>' + description + '</td>';
					row += '<td>' + address + '</td>';
					row += '<td>' + latitude + '</td>';
					row += '<td>' + longitude + '</td>';
					row += '<td><a onclick="showEditForm(' + locationId + ')">Edit</a></td>';
					row += '<td><a onclick="deleteSighting(' + locationId + ')">Delete</a></td>';
					row += '</tr>';

				contentRows.append(row);
			});
		},
		error: function() {
			$('#errorMessages')
				.append($('<li>')
				.attr({class: 'list-group-item list-group-item-danger'})
				.text('Error calling web service. Please try again later.'));
		}
	});
}

function clearSightingsTable() {
	$('#contentRows').empty();
}

function deleteSighting(sightingId) {
	$.ajax({
		type: 'DELETE',
		url: 'http://localhost:8080/sighting/' + sightingId,
		success: function() {
			loadSightings();
		}
	});
}

function showEditForm(sightingId) {
    // clear errorMessages
    $('#errorMessages').empty();
    // get the contact details from the server and then fill and show the
    // form on success
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/contact/' + contactId,
        success: function(data, status) {
              $('#edit-first-name').val(data.firstName);
              $('#edit-last-name').val(data.lastName);
              $('#edit-company').val(data.company);
              $('#edit-email').val(data.email);
              $('#edit-phone').val(data.phone);
              $('#edit-contact-id').val(data.contactId);
          },
          error: function() {
            $('#errorMessages')
               .append($('<li>')
               .attr({class: 'list-group-item list-group-item-danger'})
               .text('Error calling web service.  Please try again later.'));
          }
    });
    $('#contactTableDiv').hide();
    $('#editFormDiv').show();
}


