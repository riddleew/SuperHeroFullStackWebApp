$(document).ready(function () {
	
	loadRecentSightings();

});

function loadRecentSightings() {
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/recentsightings',
		success: function(sightingArray) {
			$.each(sightingArray, function(index, sighting) {
				
				var name = sighting.aSuper.name;
				var location = sighting.location.name;
				var datetime = sighting.sightingTime;
				var date = datetime.substring(0,10)
				var time = datetime.substring(11,19)

				var row = '<tr>';
					row += '<td>' + name + '</td>';
					row += '<td>' + location + '</td>';
					row += '<td>' + date + '</td>';
					row += '<td>' + time + '</td>';
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




