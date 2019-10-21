$(document).ready(function () {

    loadPowers();

    $('#edit-update-button').click(function (event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));

        if (haveValidationErrors) {
            return false;
        }

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
            success: function () {
                $('#errorMessages').empty();
                hideEditForm();
                loadPowers();
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

    $('#confirm-add-power').click(function (event) {

        var haveValidationErrors = checkAndDisplayValidationErrorsModal($('#addModal').find('input'));

        if (haveValidationErrors) {
            return false;
        }
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
            success: function () {
                $('#errorMessages').empty();
                $('#add-power-name').val('');
                $('#add-power-description').val('');
                loadPowers();
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service. Please try again later.'));
            }
        });


    });


});

function loadPowers() {
    clearPowersTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/powers',
        success: function (powerArray) {
            $.each(powerArray, function (index, power) {

                var name = power.name;
                var description = power.description;
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
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });
}

function showEditForm(powerId) {
    $('#errorMessages').empty();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/power/' + powerId,
        success: function (data, status) {
            $('#edit-power-name').val(data.name);
            $('#edit-power-description').val(data.description);
            $('#edit-power-id').val(data.id);
        },
        error: function () {
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
    $('#errorMessages').empty();

    $('#edit-power-name').val('');
    $('#edit-power-description').val('');
    $('#editFormDiv').hide();
    $('#powerTableDiv').show();
}


function deletePower(powerId, name) {
    if (!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
        return;
    }
    $.ajax({
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

function hideErrors() {
    $('#errorMessagesModal').empty();
}


function checkAndDisplayValidationErrors(input) {
    // clear displayed error message if there are any
    $('#errorMessages').empty();
    // check for HTML5 validation errors and process/display appropriately
    // a place to hold error messages
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