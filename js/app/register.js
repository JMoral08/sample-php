$(document).ready(function() {

let Init = {
	form_register  			: $("#form-register"),
	text_firstname 			: $("#txt-firstname"),
	text_lastname 			: $("#txt-lastname"),
	text_middlename 		: $("#txt-middlename"),
	text_birthdate 			: $("#txt-birthdate"),
	text_contactno 			: $("#txt-contactno"),
	text_email 				: $("#txt-email"),
	text_address 			: $("#txt-address"),
	text_role 				: $("#txt-role"),
	text_status 			: $("#txt-status"),
	label_user              : $("#lbl-user"),
    label_users             : $("#lbl-users"),

	tbody_people  			: $("#tbody-people"),
	add_people  			: $("#add-people"),
	view_people 			: $("#view-people"),

	button_add_people 		: $("#btn-add-people"),
	button_cancel_people	: $("#btn-cancel-people"),
	button_update_people  	: $("#btn-update-people"),
	button_register_people 	: $("#btn-register-people"),
	button_back_people 		: $("#btn-back-people"),
	button_generate  		: $("#btn-generate")
};
Init.button_add_people.on('click', AddPeople);
Init.button_cancel_people.on('click', FormCancel);
Init.button_register_people.on('click', ShowPeople);
Init.button_back_people.on('click', Back);
Init.tbody_people.on('click', '#btn-edit', EditPeople);
Init.tbody_people.on('click', '#btn-generate', GeneratetoUser);
showData();
show();

function show() {
	let $self = Init;
		$self.view_people.show();
	 	$self.add_people.hide();
	 	$('#add-footer').hide();
}

function FormCancel() {
	let $self = Init;
	 	$self.form_register[0].reset();
	 	$self.text_status.attr('disabled', true);
	 	$self.button_update_people.hide();
	 	$self.button_add_people.show();
}

function ShowPeople() {
	let $self = Init;
		$self.view_people.hide();
	 	$self.add_people.show();
	 	$self.button_update_people.hide();
	 	$self.button_add_people.show();
	 	$('#add-footer').show();
}

function Back() {
	let $self = Init;
		$self.view_people.show();
	 	$self.add_people.hide();
	 	$self.button_update_people.hide();
	 	$self.button_add_people.show();
	 	$('#add-footer').hide();
	 	FormCancel();
}

function AddPeople() {
	let $self = Init;

	if($self.text_firstname.val() == '' ) {
		$self.text_firstname.focus();
	} else if ($self.text_lastname.val() == '' ) {
		$self.text_lastname.focus();
	} else if ($self.text_birthdate.val() == '' ) {
		$self.text_birthdate.focus();
	} else if ($self.text_contactno.val() == '' ) {
		$self.text_contactno.focus();
	} else if ($self.text_birthdate.val() == '' ) {
		$self.text_birthdate.focus();
	} else if ($self.text_email.val() == '' ) {
		$self.text_email.focus();
	} else if ($self.text_address.val() == '' ) {
		$self.text_address.focus();
	} else if ($self.text_role.val() == '' ) {
		$self.text_role.focus();
	} else {
		let data = {
			'action' 		: 'insert',
			'firstname' 	: $self.text_firstname.val(),
			'lastname' 		: $self.text_lastname.val(),
			'middlename' 	: $self.text_middlename.val(),
			'birthdate' 	: $self.text_birthdate.val(),
			'contactno' 	: $self.text_contactno.val(),
			'email' 		: $self.text_email.val(),
			'address' 		: $self.text_address.val(),
			'role' 			: $self.text_role.val(),
			'status' 		: $self.text_status.val()
		};
		$.ajax({
			url: 'model/register.php',
			type: 'post',
			data: data,
			success:function(data) {
				let Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: (toast) => {
					  toast.onmouseenter = Swal.stopTimer;
					  toast.onmouseleave = Swal.resumeTimer;
					}
				  });
				  Toast.fire({
					icon: "success",
					title: data
				  })
				  Back();
				  FormCancel();
			}
		});
	}
}

function EditPeople() {
	let $self = Init;
	let id = $(this).attr('data-id');
	let firstname = $(this).closest('tr').find('td[data-target=firstname]').html();
	let middlename = $(this).closest('tr').find('td[data-target=middlename]').html();
	let lastname = $(this).closest('tr').find('td[data-target=lastname]').html();
	let contactno = $(this).closest('tr').find('td[data-target=contactno]').html();
	let email = $(this).closest('tr').find('td[data-target=email]').html();
	let address = $(this).closest('tr').find('td[data-target=address]').html();
	let birthdate = $(this).closest('tr').find('td[data-target=birthdate]').html();
	let role = $(this).closest('tr').find('td[data-target=role]').html();

	$self.text_firstname.val(firstname);
	$self.text_middlename.val(middlename);
	$self.text_lastname.val(lastname);
	$self.text_contactno.val(contactno);
	$self.text_email.val(email);
	$self.text_address.val(address);
	$self.text_birthdate.val(birthdate);
	$self.text_role.val(role);
	$self.text_status.removeAttr('disabled', true);
	$self.view_people.hide();
	$self.add_people.show();
	$self.button_update_people.show();
	$self.button_add_people.hide();
	$('#add-footer').show();
	$('body').on('click', '#btn-update-people', function() {
		let data = {
			'action' 		: 'update',
			'id' 			: id,
			'firstname' 	: $self.text_firstname.val(),
			'lastname' 		: $self.text_lastname.val(),
			'middlename' 	: $self.text_middlename.val(),
			'birthdate' 	: $self.text_birthdate.val(),
			'contactno' 	: $self.text_contactno.val(),
			'email' 		: $self.text_email.val(),
			'address' 		: $self.text_address.val(),
			'role' 			: $self.text_role.val(),
			'status' 		: $self.text_status.val()
		};
		Swal.fire({
			title: "Are you sure?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, change it!"
		  }).then((result) => {
			if (result.isConfirmed) {
			  $.ajax({
				  url: 'model/register.php',
				  type: 'post',
				  data: data,
				  success:function(data) {
					  //console.log(data);
					  Swal.fire({
						title: data,
						text: "Your file has been updated.",
						icon: "success"
					  }).then([
						showData()
					  ]);
					  Back();
				  }
			  });
			}
		  });
	});
	

}

function GeneratetoUser() {
	let $self = Init;
	let mythis = this;
	let id = $(this).attr('data-id');
	$.ajax({
		url: 'model/register.php',
		type: 'post',
		data: {'action' : 'generate', 'id' : id},
		success:function(data) {
			Swal.fire({
				title: data,
				text: "Your file has been added.",
				icon: "success"
			}).then([
				$(mythis).closest('tr').remove()
			]);
			$(mythis).closest('tr').remove();
		}
	});
}

function showData() {
	let $self = Init;
	let output = '';
	let data = {
		'action' 	: 'view' 
	};
	$.ajax({
		url: 'model/register.php',
		type: 'post',
		data: data,
		dataType: 'json',
		success:function(data) {
			for(i=0; i<data.length; i++) {
				output += "<tr id='"+data[i].id+"'>"+
						"<td data-target='firstname'>"+data[i].firstname+"</td>"+
						"<td data-target='middlename'>"+data[i].middlename+"</td>"+
						"<td data-target='lastname'>"+data[i].lastname+"</td>"+
						"<td data-target='contactno'>"+data[i].contactno+"</td>"+
						"<td data-target='email'>"+data[i].email+"</td>"+
						"<td data-target='address'>"+data[i].address+"</td>"+
						"<td data-target='birthdate'>"+data[i].birthdate+"</td>"+
						"<td data-target='role'>"+data[i].role+"</td>"+
						"<td>"+
							"<div class='btn-group' role='group'>"+
								"<button class='btn btn-outline-secondary btn-sm' data-id='"+data[i].id+"' id='btn-edit'><i class='bi bi-pencil-square'></i></button>"+
								"<button class='btn btn-secondary btn-sm' data-id='"+data[i].id+"' id='btn-generate'><i class='bi bi-person-plus'></i> Generate</button>"+
							"</div>"+
						"</td>"+
						"</tr>";
			}
			$self.tbody_people.html(output);
		}
	});
}


});