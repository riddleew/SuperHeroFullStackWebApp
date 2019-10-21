$(document).ready(function () {

    loadSightings();


    $('#add-submit-button').click(function (event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));

        if (haveValidationErrors) {
            return false;
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/sighting',
            data: JSON.stringify({
                superId: $('#add-select-super').val(),
                locationId: $('#add-select-location').val(),
                sightingTime: $('#add-sighting-date').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty();
                $('#add-sighting-date').val('');
                hideAddForm();
                loadSightings();
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service. Please try again later.'));
            }
        });
    });

    $('#search-date-button').click(function (event) {
        $('#searchDateDiv').show();
    });

    $('#search-date-cancel-button').click(function (event) {
        $('#searchDateDiv').hide();
        $('#sightingByDateTableDiv').hide();
        $('#sightingTableDiv').show();
    });

    $('#search-date-back-button').click(function (event) {
        $('#searchDateDiv').hide();
        $('#sightingByDateTableDiv').hide();
        $('#sightingTableDiv').show();
        $('#search-date-back-button').hide();
    });

    $('#search-confirm-button').click(function (event) {
        $('#byDateContentRows').empty();
        var byDateContentRows = $('#byDateContentRows');

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/sightingsbydate/' + $('#search-sighting-date').val(),
            success: function (sightingArray) {
                if (sightingArray.length < 1) {
                    alert("Date not found.");
                }

                $.each(sightingArray, function (index, sighting) {

                    var name = sighting.aSuper.name;
                    var location = sighting.location.name;
                    var datetime = sighting.sightingTime;
                    var date = datetime.substring(0, 10);
                    var sightingId = sighting.sightingId;

                    var row = '<tr>';
                    if (!sighting.aSuper.isHero) {
                        row += '<td style="color: red">' + name + '</td>';
                    } else {
                        row += '<td style="color: blue">' + name + '</td>';
                    }
                    row += '<td>' + location + '</td>';
                    row += '<td>' + date + '</td>';
                    row += '</tr>';

                    byDateContentRows.append(row);
                    $('#sightingByDateTableDiv').show();
                    $('#sightingTableDiv').hide();
                    $('#searchDateDiv').hide();
                    $('#search-date-back-button').show();
                });
            },
            error: function () {
  
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service. Please try again later.'));
            }
        });

    });


    $('#edit-update-button').click(function (event) {

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/sighting/' + $('#edit-sighting-id').val(),
            data: JSON.stringify({
                sightingId: $('#edit-sighting-id').val(),
                superId: $('#edit-select-super').val(),
                locationId: $('#edit-select-location').val(),
                sightingTime: $('#edit-sighting-date').val()
            }),
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {

                $('#errorMessages').empty();
                hideEditForm();
                loadSightings();

            },
            error: function (jqxhr, errortext, errorthrown) {
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

});

function loadSightings() {
    clearSightingsTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/sightings',
        success: function (sightingArray) {
            $.each(sightingArray, function (index, sighting) {

                var name = sighting.aSuper.name;
                var location = sighting.location.name;
                var datetime = sighting.sightingTime;
                var date = datetime.substring(0, 10);
                var sightingId = sighting.sightingId;

                var row = '<tr>';
                if (!sighting.aSuper.isHero) {
                    row += '<td style="color: red">' + name + '</td>';
                } else {
                    row += '<td style="color: blue">' + name + '</td>';
                }
                row += '<td>' + location + '</td>';
                row += '<td>' + date + '</td>';
                row += '<td><a onclick="showEditForm(' + sightingId + ')">Edit</a></td>';
                row += '<td><a onclick="deleteSighting(' + sightingId + ', \'' + name + '\')">Delete</a></td>';
                row += '</tr>';

                contentRows.append(row);
            });
        },
        error: function () {

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

function deleteSighting(sightingId, name) {
    if (!confirm('Are you sure you want to remove this "' + name + '" sighting from the list?')) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/sighting/" + sightingId,
        success: function (status) {
            loadSightings();
        }
    });
}

function showEditForm(sightingId) {
    $('#errorMessages').empty();
    $('#edit-select-super').empty();
    $('#edit-select-location').empty();

    var selectionOptionSuper = $('#edit-select-super');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/supers',
        success: function (superArray) {
            $.each(superArray, function (index, aSuper) {

                var name = aSuper.name;
                var superId = aSuper.id;
                var idHelper = name.replace(/ +/g, "");


                var option = '<option id="' + idHelper + '" value="' + superId + '">' + name + '</option';
                selectionOptionSuper.append(option);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });

    var selectionOptionLocation = $('#edit-select-location');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/locations',
        success: function (locationArray) {
            $.each(locationArray, function (index, location) {

                var name = location.name;
                var locationId = location.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + locationId + '">' + name + '</option';
                selectionOptionLocation.append(option);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/sighting/' + sightingId,
        success: function (data, status) {

            $('#edit-sighting-date').val(data.sightingTime);
            $('#edit-sighting-id').val(data.sightingId);

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });

    $('#sightingTableDiv').hide();

    $('#allSightings').hide();
    $('#add-button').hide();
    $('#editFormDiv').show();
    $('#search-date-button').hide();
    $('#searchDateDiv').hide();
};

function addFunction() {
    $('#add-select-super').empty();
    $('#add-select-location').empty();

    $('#sightingTableDiv').hide();
    $('#allSightings').hide();
    $('#add-button').hide();
    $('#addFormDiv').show();
    $('#search-date-button').hide();
    $('#searchDateDiv').hide();


    var selectionOptionSuper = $('#add-select-super');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/supers',
        success: function (superArray) {
            $.each(superArray, function (index, aSuper) {

                var name = aSuper.name;
                var superId = aSuper.id;
                var idHelper = name.replace(/ +/g, "");


                var option = '<option id="' + idHelper + '" value="' + superId + '">' + name + '</option';
                selectionOptionSuper.append(option);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });

    var selectionOptionLocation = $('#add-select-location');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/locations',
        success: function (locationArray) {
            $.each(locationArray, function (index, location) {

                var name = location.name;
                var locationId = location.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + locationId + '">' + name + '</option';
                selectionOptionLocation.append(option);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });

}

function hideAddForm() {
    $('#errorMessages').empty();
    $('#add-sighting-date').val('');
    $('#addFormDiv').hide();
    $('#sightingTableDiv').show();
    $('#allSightings').show();
    $('#add-button').show();
    $('#search-date-button').show();

}

function hideEditForm() {
    $('#errorMessages').empty();

    $('#edit-sighting-date').val('');

    $('#editFormDiv').hide();
    $('#sightingTableDiv').show();
    $('#allSightings').show();
    $('#add-button').show();
    $('#search-date-button').show();

}

function checkAndDisplayValidationErrors(input) {
    // clear displayed error message if there are any
    $('#errorMessages').empty();
    // check for HTML5 validation errors and process/display appropriately
    // a place to hold error messages
    var errorMessages = [];

    // loop through each input and check for validation errors
    input.each(function() {
        // Use the HTML5 validation API to find the validation errors
        if(!this.validity.valid)
        {
            var errorField = $('label[for='+this.id+']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    // put any error messages in the errorMessages div
    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message){
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}
 