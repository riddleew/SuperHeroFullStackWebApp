$(document).ready(function () {
	
	loadPowers();

});

function loadPowers() {
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/powers',
		success: function(powerArray) {
			$.each(powerArray, function(index, power) {
				
				var name = power.name;
				var description =  power.description;
				var powerId = power.id;


				var row = '<tr>';
					row += '<td>' + name + '</td>';
					row += '<td>' + description + '</td>';
					row += '<td><a onclick="showEditForm(' + powerId + ')">Edit</a></td>';
					row += '<td><a onclick="deletePower(' + powerId + ')">Delete</a></td>';
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




