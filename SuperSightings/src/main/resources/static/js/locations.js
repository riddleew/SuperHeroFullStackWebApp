$(document).ready(function () {

    loadLocations();

    $('#confirm-add-location').click(function (event) {

        var haveValidationErrors = checkAndDisplayValidationErrorsModal($('#addModal').find('input'));

        // if we have errors, bail out by returning false
        if (haveValidationErrors) {
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/location',
            data: JSON.stringify({
                name: $('#add-location-name').val(),
                description: $('#add-location-description').val(),
                street: $('#add-location-street').val(),
                city: $('#add-location-city').val(),
                state: $('#add-location-state').val(),
                zip: $('#add-location-zip').val(),
                latitude: $('#add-location-latitude').val(),
                longitude: $('#add-location-longitude').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty();
                $('#add-location-name').val('');
                $('#add-location-description').val('');
                $('#add-location-street').val('');
                $('#add-location-city').val('');
                $('#add-location-state').val('');
                $('#add-location-zip').val('');
                $('#add-location-latitude').val('');
                $('#add-location-longitude').val('');
                loadLocations();
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

        var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));

        // if we have errors, bail out by returning false
        if (haveValidationErrors) {
            return false;
        }
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/location/' + $('#edit-location-id').val(),
            data: JSON.stringify({
                id: $('#edit-location-id').val(),
                name: $('#edit-location-name').val(),
                description: $('#edit-location-description').val(),
                street: $('#edit-location-street').val(),
                city: $('#edit-location-city').val(),
                state: $('#edit-location-state').val(),
                zip: $('#edit-location-zip').val(),
                latitude: $('#edit-location-latitude').val(),
                longitude: $('#edit-location-longitude').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                // clear errorMessages
                $('#errorMessages').empty();
                hideEditForm();
                loadLocations();
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

    $('#back-button').click(function (event) {
        $('#locationSuperTableDiv').hide();
        $('#locationTableDiv').show();
        // $('#allSupers').show();
        // $('#add-button').show();

    });

});

function loadLocations() {
    clearLocationsTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/locations',
        success: function (locationArray) {
            $.each(locationArray, function (index, location) {
                var name = location.name;
                var description = location.description;
                var address = location.street;
                address += ', ' + location.city;
                address += ', ' + location.state;
                address += ' ' + location.zip;

                var latitude = location.latitude;
                var longitude = location.longitude;
                var locationId = location.id;


                var row = '<tr>';
                // row += '<td>' + name + '</td>';
                row += '<td><a onclick="showSupers(' + locationId + ', \'' + name + '\')">' + name + '</a></td>';
                row += '<td>' + description + '</td>';
                row += '<td>' + address + '</td>';
                row += '<td>' + latitude + '</td>';
                row += '<td>' + longitude + '</td>';
                row += '<td><a onclick="showEditForm(' + locationId + ')">Edit</a></td>';
                row += '<td><a onclick="deleteLocation(' + locationId + ', \'' + name + '\')">Delete</a></td>';
                row += '</tr>';

                contentRows.append(row);
            });
        },
        error: function (jqxhr, errortext, errorthrown) {
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

function clearLocationsTable() {
    $('#contentRows').empty();
}

function deleteLocation(locationId, name) {
    if (!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/location/" + locationId,
        success: function (status) {
            loadLocations();
        }
    });
}

function showSupers(locationId, name) {
    $('#errorMessages').empty();
    $('#nameHeader').empty();
    $('#superContentRows').empty();

    // get the contact details from the server and then fill and show the
    // form on success
    var locationList = $('#locationList');
    var superContentRows = $('#superContentRows');
    var header = "Supers that have been sighted at " + name;
    $('#nameHeader').append(header);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/supersbylocation/' + locationId,
        success: function (superArray, status) {

            $.each(superArray, function (index, aSuper) {

                var name = aSuper.name;
                var description = aSuper.description;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + description + '</td>'
                row += '</tr';

                superContentRows.append(row);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });
    $('#locationTableDiv').hide();
    $('#locationSuperTableDiv').show();


}

function showEditForm(sightingId) {

    $('#errorMessages').empty();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/contact/' + contactId,
        success: function (data, status) {
            $('#edit-first-name').val(data.firstName);
            $('#edit-last-name').val(data.lastName);
            $('#edit-company').val(data.company);
            $('#edit-email').val(data.email);
            $('#edit-phone').val(data.phone);
            $('#edit-contact-id').val(data.contactId);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });
    $('#contactTableDiv').hide();
    $('#editFormDiv').show();
}

function showEditForm(locationId) {

    $('#errorMessages').empty();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/location/' + locationId,
        success: function (data, status) {
            $('#edit-location-name').val(data.name);
            $('#edit-location-description').val(data.description);
            $('#edit-location-street').val(data.street);
            $('#edit-location-city').val(data.city);
            $('#edit-location-state').val(data.state);
            $('#edit-location-zip').val(data.zip);
            $('#edit-location-latitude').val(data.latitude);
            $('#edit-location-longitude').val(data.longitude);
            $('#edit-location-id').val(data.id);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });
    $('#locationTableDiv').hide();
    $('#editFormDiv').show();
}

function hideEditForm() {
    $('#errorMessages').empty();

    $('#edit-location-name').val('');
    $('#edit-location-description').val('');
    $('#edit-location-street').val('');
    $('#edit-location-city').val('');
    $('#edit-location-state').val('');
    $('#edit-location-zip').val('');
    $('#edit-location-latitude').val('');
    $('#edit-location-longitude').val('');
    $('#edit-location-id').val('');

    $('#editFormDiv').hide();
    $('#locationTableDiv').show();
}

function hideErrors() {
    $('#errorMessagesModal').empty();
}

function checkAndDisplayValidationErrors(input) {
    $('#errorMessages').empty();

    var errorMessages = [];

    // loop through each input and check for validation errors
    input.each(function () {
        // Use the HTML5 validation API to find the validation errors
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    // put any error messages in the errorMessages div
    if (errorMessages.length > 0) {
        $.each(errorMessages, function (index, message) {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}

function checkAndDisplayValidationErrorsModal(input) {
    // clear displayed error message if there are any
    $('#errorMessagesModal').empty();
    // check for HTML5 validation errors and process/display appropriately
    // a place to hold error messages
    var errorMessagesModal = [];

    // loop through each input and check for validation errors
    input.each(function () {
        // Use the HTML5 validation API to find the validation errors
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessagesModal.push(errorField + ' ' + this.validationMessage);
        }
    });

    // put any error messages in the errorMessages div
    if (errorMessagesModal.length > 0) {
        $.each(errorMessagesModal, function (index, message) {
            $('#errorMessagesModal').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}