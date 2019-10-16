$(document).ready(function () {
	
	loadSightings();

});

function loadSightings() {
	clearSightingsTable();
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/sightings',
		success: function(sightingArray) {
			$.each(sightingArray, function(index, sighting) {
				
				var  name = sighting.aSuper.name;
				var location = sighting.location.name;
				var datetime = sighting.sightingTime;
				var date = datetime.substring(0,10)
				var time = datetime.substring(11,19)
				var sightingId = sighting.sightingId;

				var row = '<tr>';
					row += '<td>' + name + '</td>';
					row += '<td>' + location + '</td>';
					row += '<td>' + date + '</td>';
					row += '<td>' + time + '</td>';
					row += '<td><a onclick="showEditForm(' + sightingId + ')">Edit</a></td>';
					row += '<td><a onclick="deleteSighting(' + sightingId + ')">Delete</a></td>';
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
	
	console.log('yo');
	$.ajax({
		type: 'DELETE',
		url: 'http://localhost:8080/sighting/' + sightingId,
		success: function() {
			console.log('hi');
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


