$(document).ready(function () {

    loadOrganizations();

    $('#add-submit-button').click(function (event) {
        var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));

        if (haveValidationErrors) {
            return false;
        }

        var superSelections = $('#add-members-multiple-selector').val();
        var memberList = [];
        if (superSelections != null) {
            for (var i = 0; i < superSelections.length; i++) {

                var currentId = superSelections[i];
                var currentSuper = new Object();
                currentSuper.id = currentId;
                memberList.push(currentSuper);
            }
        }


        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/org',
            data: JSON.stringify({
                name: $('#add-org-name').val(),
                description: $('#add-org-description').val(),
                hotline: $('#add-org-hotline').val(),
                members: memberList
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty();
                $('#add-org-name').val('');
                $('#add-org-description').val('');
                $('#add-org-hotline').val('');
                $('#members-multiple-selector').val('');

                hideAddForm();
                loadOrganizations();
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
        var superSelections = $('#edit-members-multiple-selector').val();

        var memberList = [];
        if (superSelections != null) {
            for (var i = 0; i < superSelections.length; i++) {

                var currentId = superSelections[i];
                var currentSuper = new Object();
                currentSuper.id = currentId;
                memberList.push(currentSuper);
            }
        }

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/org/' + $('#edit-org-id').val(),
            data: JSON.stringify({
                id: $('#edit-org-id').val(),
                name: $('#edit-org-name').val(),
                description: $('#edit-org-description').val(),
                hotline: $('#edit-org-hotline').val(),
                members: memberList
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function () {
                $('#errorMessages').empty();
                $('#editFormDiv').hide();
                $('#orgTableDiv').show();
                $('#allOrg').show();
                $('#add-button').show();
                loadOrganizations();
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

function loadOrganizations() {
    clearOrganizationsTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/orgs',
        success: function (orgArray) {
            $.each(orgArray, function (index, org) {
                var name = org.name;
                var description = org.description;
                var hotline = org.hotline;
                var orgId = org.id;
                var superArray = org.members;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + description + '</td>';
                row += '<td>' + hotline + '</td>';

                // inserting unique Member List modals
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
                $.each(superArray, function (index, member) {
                    row += '<li>' + member.name + '</li>';
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

function clearOrganizationsTable() {
    $('#contentRows').empty();
}


function deleteOrganization(orgId, name) {
    if (!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:8080/org/" + orgId,
        success: function (status) {
            loadOrganizations();
        }
    });
}

function addFunction() {
    clearMultipleSelections();
    $('#orgTableDiv').hide();
    $('#allOrg').hide();
    $('#add-button').hide();
    $('#addFormDiv').show();

    var selectorOption = $('#add-members-multiple-selector');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/supers',
        success: function (superArray) {
            $.each(superArray, function (index, aSuper) {

                var name = aSuper.name;
                var superId = aSuper.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + superId + '">' + name + '</option';
                selectorOption.append(option);
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

function clearMultipleSelections() {
    $('#add-members-multiple-selector').empty();
}

function hideAddForm() {
    $('#errorMessages').empty();

    $('#add-org-name').val('');
    $('#add-org-description').val('');
    $('#add-org-hotline').val('');
    $('#addFormDiv').hide();
    $('#orgTableDiv').show();
    $('#allOrg').show();
    $('#add-button').show();

}

function hideEditForm() {
    $('#errorMessages').empty();

    $('#edit-org-name').val('');
    $('#edit-org-description').val('');
    $('#edit-org-hotline').val('');
    $('#editFormDiv').hide();
    $('#orgTableDiv').show();
    $('#allOrg').show();
    $('#add-button').show();

}

function showEditForm(orgId) {
    $('#errorMessages').empty();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/org/' + orgId,
        success: function (data, status) {

            populateMultiple(orgId);

            $('#edit-org-name').val(data.name);
            $('#edit-org-description').val(data.description);
            $('#edit-org-hotline').val(data.hotline);
            $('#edit-org-id').val(data.id);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
        }
    });
    $('#orgTableDiv').hide();

    $('#allOrg').hide();
    $('#add-button').hide();
    $('#editFormDiv').show();
}

function populateMultiple(orgId) {
    $('#edit-members-multiple-selector').empty();
    var selectorOption = $('#edit-members-multiple-selector');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/supers',
        success: function (superArray) {
            $.each(superArray, function (index, aSuper) {

                var name = aSuper.name;
                var superId = aSuper.id;
                var idHelper = name.replace(/ +/g, "");

                var option = '<option id="' + idHelper + '" value="' + superId + '">' + name + '</option';
                selectorOption.append(option);
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

function hideEditForm() {
    $('#errorMessages').empty();

    $('#edit-org-name').val('');
    $('#edit-org-description').val('');
    $('#editFormDiv').hide();
    $('#orgTableDiv').show();
    $('#allOrg').show();
    $('#add-button').show();
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