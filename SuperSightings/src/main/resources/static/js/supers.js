$(document).ready(function () {

    loadSupers();


    $('#add-submit-button').click(function (event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));

        if (haveValidationErrors) {
            return false;
        }

        var powerSelections = $('#add-powers-multiple-selector').val();
        var orgSelections = $('#add-orgs-multiple-selector').val();
        var powerList = [];
        var orgList = [];
        if (powerSelections != null) {
            for (var i = 0; i < powerSelections.length; i++) {

                var currentId = powerSelections[i];
                var currentPower = new Object();
                currentPower.id = currentId;
                powerList.push(currentPower);
            }
        }

        if (orgSelections != null) {
            for (var i = 0; i < orgSelections.length; i++) {

                var currentId = orgSelections[i];
                var currentOrg = new Object();
                currentOrg.id = currentId;
                orgList.push(currentOrg);
            }
        }

        var isHero = $('input[name=heroOrVillainAdd]:checked').val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/super',
            data: JSON.stringify({
                name: $('#add-super-name').val(),
                description: $('#add-super-description').val(),
                isHero: isHero,
                powers: powerList,
                organizations: orgList

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty();
                $('#add-super-name').val('');
                $('#add-super-description').val('');
                $('#add-powers-multiple-selector').val('');
                $('#add-orgs-multiple-selector').val('');

                document.getElementById("gridRadios1").checked = true;
                $('#addFormDiv').hide();
                $('#superTableDiv').show();
                $('#allSupers').show();
                $('#add-button').show();

                loadSupers();
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

        if (haveValidationErrors) {
            return false;
        }

        var powerSelections = $('#edit-powers-multiple-selector').val();
        var orgSelections = $('#edit-orgs-multiple-selector').val();
        var powerList = [];
        var orgList = [];
        if (powerSelections != null) {
            for (var i = 0; i < powerSelections.length; i++) {

                var currentId = powerSelections[i];
                var currentPower = new Object();
                currentPower.id = currentId;
                powerList.push(currentPower);
            }
        }

        if (orgSelections != null) {
            for (var i = 0; i < orgSelections.length; i++) {

                var currentId = orgSelections[i];
                var currentOrg = new Object();
                currentOrg.id = currentId;
                orgList.push(currentOrg);
            }
        }
        var isHero = $('input[name=heroOrVillainEdit]:checked').val();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/super/' + $('#edit-super-id').val(),
            data: JSON.stringify({
                id: $('#edit-super-id').val(),
                name: $('#edit-super-name').val(),
                description: $('#edit-super-description').val(),
                isHero: isHero,
                powers: powerList,
                organizations: orgList
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty();
                $('#editFormDiv').hide();
                $('#superTableDiv').show();
                $('#allSuppers').show();
                $('#add-button').show();
                loadSupers();
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('Error calling web service. Please try again later.'));
            }
        });
    });


    $('#back-button').click(function (event) {
        $('#superLocationTableDiv').hide();
        $('#superTableDiv').show();
        $('#allSupers').show();
        $('#add-button').show();

    });

});

function loadSupers() {
    clearSupersTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/supers',
        success: function (superArray) {
            $.each(superArray, function (index, aSuper) {
                var name = aSuper.name;
                var description = aSuper.description;
                var powerArray = aSuper.powers;
                var orgArray = aSuper.organizations;
                var superId = aSuper.id;

                var row = '<tr>';
                if (!aSuper.isHero) {
                    row += '<td><a style ="color: red" onclick="showLocations(' + superId + ', \'' + name + '\')">' + name + '</a></td>';
                } else {
                    row += '<td><a onclick="showLocations(' + superId + ', \'' + name + '\')">' + name + '</a></td>';
                }

                row += '<td>' + description + '</td>';

                // inserting unique Power List modals
                row += '<td><a data-toggle="modal" data-target="#powerModal' + superId + '">View</a>';
                row += '<div class="modal" id="powerModal' + superId + '" tabindex="-1" role="dialog">';
                row += '<div class="modal-dialog" role="document">';
                row += '<div class="modal-content">';
                row += '<div class="modal-header">';
                row += '<h2 class="modal-title">Powers</h2>';
                row += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                row += '<span aria-hidden="true">&times;</span>';
                row += '</button></div>';
                row += '<div class="modal-body">';
                row += '<ol>';
                //retrieve members
                $.each(powerArray, function (index, power) {
                    row += '<li>' + power.name + '</li>';
                });
                row += '</ol>';
                row += '</div><div class="modal-footer">';
                row += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
                row += '</div></div></div></div></td>';
                // end of Modal

                // inserting unique Org List modals
                row += '<td><a data-toggle="modal" data-target="#orgModal' + superId + '">View</a>';
                row += '<div class="modal" id="orgModal' + superId + '" tabindex="-1" role="dialog">';
                row += '<div class="modal-dialog" role="document">';
                row += '<div class="modal-content">';
                row += '<div class="modal-header">';
                row += '<h2 class="modal-title">Organizations</h2>';
                row += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                row += '<span aria-hidden="true">&times;</span>';
                row += '</button></div>';
                row += '<div class="modal-body">';
                row += '<ol>';
                //retrieve members
                $.each(orgArray, function (index, org) {
                    row += '<li>' + org.name + '</li>';
                });
                row += '</ol>';
                row += '</div><div class="modal-footer">';
                row += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
                row += '</div></div></div></div></td>';
                // end of Modal
                row += '<td><a onclick="showEditForm(' + superId + ')">Edit</a></td>';
                row += '<td><a onclick="deleteSuper(' + superId + ', \'' + name + '\')">Delete</a></td>';
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

function clearSupersTable() {
    $('#contentRows').empty();
}

function addFunction() {
    $('#add-powers-multiple-selector').empty();
    $('#add-orgs-multiple-selector').empty();

    $('#superTableDiv').hide();
    $('#allSupers').hide();
    $('#add-button').hide();
    $('#addFormDiv').show();

    var selectorOptionPower = $('#add-powers-multiple-selector');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/powers',
        success: function (powerArray) {
            $.each(powerArray, function (index, power) {

                var name = power.name;
                var powerId = power.id;
                var idHelper = name.replace(/ +/g, "");


                var option = '<option id="' + idHelper + '" value="' + powerId + '">' + name + '</option';
                selectorOptionPower.append(option);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });

    var selectorOptionOrg = $('#add-orgs-multiple-selector');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/orgs',
        success: function (orgArray) {
            $.each(orgArray, function (index, org) {

                var name = org.name;
                var orgId = org.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + orgId + '">' + name + '</option';
                selectorOptionOrg.append(option);
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

function showLocations(superId, name) {
    $('#errorMessages').empty();
    $('#nameHeader').empty();
    $('#locationContentRows').empty();

    var locationList = $('#locationList');
    var locationContentRows = $('#locationContentRows');
    var header = "Locations where " + name + " has been sighted";
    $('#nameHeader').append(header);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/locationsbysuper/' + superId,
        success: function (locationArray, status) {

            $.each(locationArray, function (index, location) {

                var name = location.name;
                var description = location.description;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + description + '</td>'
                row += '</tr';

                locationContentRows.append(row);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });
    $('#superTableDiv').hide();
    $('#allSupers').hide();
    $('#add-button').hide();
    $('#superLocationTableDiv').show();
}

function deleteSuper(superId, name) {
    if (!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/super/" + superId,
        success: function (status) {
            loadSupers();
        }
    });
}

function hideAddForm() {
    $('#errorMessages').empty();

    $('#add-super-name').val('');
    $('#add-super-description').val('');
    $('#add-powers-multiple-selector').val('');
    $('#add-orgs-multiple-selector').val('');

    $('#addFormDiv').hide();
    $('#superTableDiv').show();
    $('#allSupers').show();
    $('#add-button').show();

}

function showEditForm(superId) {
    $('#errorMessages').empty();
    var allMembers = [];
    var currentMembers = [];

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/super/' + superId,
        success: function (data, status) {

            populateMultiple(superId);

            $('#edit-super-name').val(data.name);
            $('#edit-super-description').val(data.description);

            // not sure why this isn't working.
            // should check the appropriate radio depending on if the super
            // is a hero or a villain, but it is not.
            if (data.isHero == true) {
                document.getElementById("gridRadios1").checked = true;
            } else {
                document.getElementById("gridRadios2").checked = true;
            }
            $('#edit-super-id').val(data.id);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });
    $('#superTableDiv').hide();
    $('#allSupers').hide();
    $('#add-button').hide();
    $('#editFormDiv').show();

}

function hideEditForm() {
    $('#errorMessages').empty();

    $('#edit-super-name').val('');
    $('#edit-super-description').val('');

    $('#editFormDiv').hide();
    $('#superTableDiv').show();
    $('#allSupers').show();
    $('#add-button').show();
}

function populateMultiple(superId) {
    $('#edit-powers-multiple-selector').empty();
    $('#edit-orgs-multiple-selector').empty();

    var selectorOptionPower = $('#edit-powers-multiple-selector');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/powers',
        success: function (powerArray) {
            $.each(powerArray, function (index, power) {

                var name = power.name;
                var powerId = power.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + powerId + '">' + name + '</option';
                selectorOptionPower.append(option);
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service. Please try again later.'));
        }
    });

    var selectorOptionOrg = $('#edit-orgs-multiple-selector');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/orgs',
        success: function (orgArray) {
            $.each(orgArray, function (index, org) {

                var name = org.name;
                var orgId = org.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + orgId + '">' + name + '</option';
                selectorOptionOrg.append(option);
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
