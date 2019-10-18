$(document).ready(function () {
	// var sample = "hey i like u";
	// var sampleTrim = sample.replace(/ +/g, "");
	
	loadOrganizations();

	$('#add-submit-button').click(function (event) {
		var tempArray = $('#members-multiple-selector').val();
		var arrayLength = tempArray.length;
		var idList = [];
		var memberList = [];
		var memberJSON = "";
		console.log(tempArray);
		
		
		for (var i = 0; i < arrayLength; i++) {
   		console.log(tempArray[i].substr(0, tempArray[i].indexOf(')')));
   		var currentInt = parseInt(tempArray[i].substr(0, tempArray[i].indexOf(')')));
   		var currentSuper = new Object();
   		currentSuper.id = currentInt;
   		memberList.push(currentSuper);
   		memberJSON += '{id: ' + currentInt + '}'
   		}
   		console.log('member list is');
   		console.log(memberList);
   		// if (i != arrayLength - 1) {
   		// 	memberJSON += ', ';
   		// }


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
      success: function() {
        $('#errorMessages').empty();
        $('#add-org-name').val('');
        $('#add-org-description').val('');
        $('#add-org-hotline').val('');
        loadOrganizations();
      },
      error: function() {
        $('#errorMessages')
          .append($('<li>')
          .attr({class: 'list-group-item list-group-item-danger'})
          .text('Error calling web service. Please try again later.'));
      }
    });

		});



	
		

	
 //    // $.ajax({
 //    //   type: 'POST',
 //    //   url: 'http://localhost:8080/power',
 //    //   data: JSON.stringify({
 //    //     name: $('#add-power-name').val(),
 //    //     description: $('#add-power-description').val()
 //    //   }),
 //    //   headers: {
 //    //     'Accept': 'application/json',
 //    //     'Content-Type': 'application/json'
 //    //   },
 //    //   'dataType': 'json',
 //    //   success: function() {
 //    //     $('#errorMessages').empty();
 //    //     $('#add-power-name').val('');
 //    //     $('#add-power-description').val('');
 //    //     loadPowers();
 //    //   },
 //    //   error: function() {
 //    //     $('#errorMessages')
 //    //       .append($('<li>')
 //    //       .attr({class: 'list-group-item list-group-item-danger'})
 //    //       .text('Error calling web service. Please try again later.'));
 //    //   }
 //    // });
 //    // var haveValidationErrors = checkAndDisplayValidationErrors($('#add-form').find('input'));

 //    // if(haveValidationErrors) {
 //    //   return false;
 //    // }

 //  });


});

function loadOrganizations() {
	clearOrganizationsTable();
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/orgs',
		success: function(orgArray) {
			$.each(orgArray, function(index, org) {
				var name = org.name;
				var description = org.description;
				var hotline = org.hotline;
				var orgId = org.id;
        var superArray = org.members;
        console.log(superArray);

				var row = '<tr>';
					  row += '<td>' + name + '</td>';
				  	row += '<td>' + description + '</td>';
					  row += '<td>' + hotline + '</td>';

            // inserting unique Member List modaks
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
            $.each(superArray, function(index, member){
              row += '<li>' + member.name+ '</li>';
            });
            row += '</ol>';
            row += '</div><div class="modal-footer">';
            row += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            row += '</div></div></div></div></td>';
            // end of Modal
            		  row += '<td><a onclick="recruitMember(' + orgId + ')">Recruit</a></td>';
					  row += '<td><a onclick="showEditForm(' + orgId + ')">Edit</a></td>';
					  row += '<td><a onclick="deleteOrganization(' + orgId + ', \'' + name + '\')">Delete</a></td>';
					  row += '</tr>';

				contentRows.append(row);
			});
		},
		error: function(jqxhr, errortext, errorthrown) {
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

function recruitMember(orgId) {

}

function deleteLocation(orgId, name) {
    if(!confirm('Are you sure you want to remove "' + name + '" from the list?')) {
    	return;
    }
    $.ajax ({
        type: 'DELETE',
        url: "http://localhost:8080/org/" + orgId,
        success: function (status) {
            loadOrganizations();
        }
    });
}

function addFunction() {
	$('#orgTableDiv').hide();
	$('#allOrg').hide();
	$('#add-button').hide();
	$('#addFormDiv').show();

	var selectorOption = $('#members-multiple-selector'); 
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/supers',
		success: function(superArray) {
			$.each(superArray, function(index, aSuper) {
				
				var name = aSuper.name;
				var superId = aSuper.id;
				var idHelper = name.replace(/ +/g, "");
				
				var aSuperId = aSuper.id;
				var option = '<option id="' + idHelper + '">' + superId + ') ' + name + '</option';
				selectorOption.append(option);
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



function hideAddForm() {
    // clear errorMessages
    $('#errorMessages').empty();
    // clear the form and then hide it
    $('#add-org-name').val('');
    $('#add-org-description').val('');
    $('#add-org-hotline').val('');
    $('#addFormDiv').hide();
    $('#orgTableDiv').show();
    $('#allOrg').show();
	$('#add-button').show();
    
}