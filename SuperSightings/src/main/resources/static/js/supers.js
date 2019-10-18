$(document).ready(function () {
	
	loadSupers();


	$('#add-submit-button').click(function (event) {
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


   		$.ajax({
	      type: 'POST',
	      url: 'http://localhost:8080/super',
	      data: JSON.stringify({
	        name: $('#add-super-name').val(),
	        description: $('#add-super-description').val(),
	        powers: powerList,
	        organizations: orgList

	      }),
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      'dataType': 'json',
	      success: function() {
	        $('#errorMessages').empty();
	        $('#add-super-name').val('');
	        $('#add-super-description').val('');
	        $('#add-powers-multiple-selector').val('');
	        $('#add-orgs-multiple-selector').val('');
	        $('#addFormDiv').hide();
		    $('#superTableDiv').show();
		    $('#allSupers').show();
			$('#add-button').show();

	        
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

});

function loadSupers() {
	clearSupersTable();
	var contentRows = $('#contentRows'); 

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/supers',
		success: function(superArray) {
			$.each(superArray, function(index, aSuper) {
				var name = aSuper.name;
				var description = aSuper.description;
				var powerArray = aSuper.powers;
				var orgArray = aSuper.organizations;
				var superId = aSuper.id;
				
        		
        		console.log(powerArray);

				var row = '<tr>';
			  		row += '<td>' + name + '</td>';
				  	row += '<td>' + description + '</td>';
					

			// inserting unique Member List modals
            row += '<td><a data-toggle="modal" data-target="#powerModal' + superId + '">View</a>';
            row += '<div class="modal" id="powerModal' + superId + '" tabindex="-1" role="dialog">';
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
            $.each(powerArray, function(index, power){
              row += '<li>' + power.name+ '</li>';
            });
            row += '</ol>';
            row += '</div><div class="modal-footer">';
            row += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            row += '</div></div></div></div></td>';
            // end of Modal

            // inserting unique Member List modals
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
            $.each(orgArray, function(index, org){
              row += '<li>' + org.name+ '</li>';
            });
            row += '</ol>';
            row += '</div><div class="modal-footer">';
            row += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
            row += '</div></div></div></div></td>';
            // end of Modal

            


            		  //row += '<td><a onclick="recruitMember(' + orgId + ')">Recruit</a></td>';
					  row += '<td><a onclick="showEditForm(' + superId + ')">Edit</a></td>';
					  row += '<td><a onclick="deleteOrganization(' + superId + ', \'' + name + '\')">Delete</a></td>';
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
		success: function(powerArray) {
			$.each(powerArray, function(index, power) {
				
				var name = power.name;
				var powerId = power.id;
				var idHelper = name.replace(/ +/g, "");
				
				var option = '<option id="' + idHelper + '" value="'+ powerId +'">' + name + '</option';
				selectorOptionPower.append(option);
			});
		},
		error: function() {
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
		success: function(orgArray) {
			$.each(orgArray, function(index, org) {
				
				var name = org.name;
				var orgId = org.id;
				var idHelper = name.replace(/ +/g, "");
				
				var option = '<option id="' + idHelper + '" value="'+ orgId +'">' + name + '</option';
				selectorOptionOrg.append(option);
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