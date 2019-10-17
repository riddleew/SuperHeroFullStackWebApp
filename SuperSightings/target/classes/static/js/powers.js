$(document).ready(function () {
	
	loadPowers();

	$('#edit-update-button').click(function (event) {

        // check for errors and display any that we have
        // pass the input associated with the edit form to the validation function
        //var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));

        // if we have errors, bail out by returning false
        // if (haveValidationErrors) {
        //     return false;
        // }

        // if we get to here, there were no errors, so make the Ajax call
        $.ajax({
           type: 'PUT',
           url: 'http://localhost:8080/power/' + $('#edit-power-id').val(),
           data: JSON.stringify({
             id: $('#edit-power-id').val(),
             name: $('#edit-power-name').val(),
             description: $('#edit-power-description').val()
           }),
           headers: {
             //'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           'dataType': 'json',
            success: function() {
                // clear errorMessages
                $('#errorMessages').empty();
                hideEditForm();
                loadPowers();
           },
           error: function(jqxhr, errortext, errorthrown) {
           		console.log(jqxhr);
           		console.log(errortext);
           		console.log(errorthrown);
             $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
           }
       })
    });



$('#add-add-button').click(function (event) {

    // var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));

    // if(haveValidationErrors) {
    //   return false;
    // }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/power',
      data: JSON.stringify({
        name: $('#add-power-name').val(),
        description: $('#add-power-description').val()
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'dataType': 'json',
      success: function() {
        $('#errorMessages').empty();
        $('#add-power-name').val('');
        $('#add-power-description').val('');
        $('#addFormDiv').hide();
        $('#powerTableDiv').show();
        loadPowers();
      },
      error: function() {
        $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
      }
    });

  });

$('#confirm-add-power').click(function (event) {
    var nameish = $('#add-power-name').val();
    console.log(nameish);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/power',
      data: JSON.stringify({
        name: $('#add-power-name').val(),
        description: $('#add-power-description').val()
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'dataType': 'json',
      success: function() {
        $('#errorMessages').empty();
        $('#add-power-name').val('');
        $('#add-power-description').val('');
        $('#addFormDiv').hide();
        $('#powerTableDiv').show();
        loadPowers();
      },
      error: function() {
        $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
      }
    });
    // var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));

    // if(haveValidationErrors) {
    //   return false;
    // }

  });


});

function loadPowers() {
	clearPowersTable();
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
					row += '<td><a onclick="deletePower(' + powerId + ', \'' + name + '\')">Delete</a></td>';
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

function showEditForm(powerId) {
    // clear errorMessages
    $('#errorMessages').empty();
    // get the contact details from the server and then fill and show the
    // form on success
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/power/' + powerId,
        success: function(data, status) {
              $('#edit-power-name').val(data.name);
              $('#edit-power-description').val(data.description);
              $('#edit-power-id').val(data.id);
          },
          error: function() {
            $('#errorMessages')
               .append($('<li>')
               .attr({class: 'list-group-item list-group-item-danger'})
               .text('Error calling web service.  Please try again later.'));
          }
    });
    $('#powerTableDiv').hide();
    $('#editFormDiv').show();
}

function hideEditForm() {
    // clear errorMessages
    $('#errorMessages').empty();
    // clear the form and then hide it
    $('#edit-power-name').val('');
    $('#edit-power-description').val('');
    $('#editFormDiv').hide();
    $('#powerTableDiv').show();
}

function hideAddForm() {
    // clear errorMessages
    $('#errorMessages').empty();
    // clear the form and then hide it
    $('#add-power-name').val('');
    $('#add-power-description').val('');
    $('#addFormDiv').hide();
    $('#powerTableDiv').show();
}

function deletePower(powerId, name) {
	//var stringName = String(name);
	//console.log(newName);
    if(!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
    	return;
    }
    $.ajax ({
        type: 'DELETE',
        url: "http://localhost:8080/power/" + powerId,
        success: function (status) {
            loadPowers();
        }
    });
}

function clearPowersTable() {
    $('#contentRows').empty();
}




