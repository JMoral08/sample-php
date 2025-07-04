$(document).ready(function() {
	let Init = {
		form_profile  		: $("#form-profile"),
		text_firstname 		: $("#txt-firstname"),
		text_middlename 	: $("#txt-middlename"),
		text_lastname 		: $("#txt-lastname"),
		text_birthdate 		: $("#txt-birthdate"),
		text_contactno 		: $("#txt-contactno"),
		text_email 			: $("#txt-email"),
		text_address		: $("#txt-address"),
		text_username 		: $("#txt-username"),
		text_password 		: $("#txt-password"),
		select_user 		: $("#select-user"),

		button_update 		: $("#btn-update")
	}
	Init.button_update.on('click', SaveChanges);
	ShowProfile();

	function SaveChanges() {
		let $self = Init;
		let id = $(this).attr('data-id');
		// alert($self.text_username.val());
		let data = {
			'action'  	: 'change',
			'id' 		: id,
			'username' 	: $self.text_username.val(),
			'password' 	: $self.text_password.val(),
			'usertype' 	: $self.select_user.val()
		}
		$.ajax({
			url: 'model/profile.php',
			type: 'post',
			data: data,
			success:function(data) {
				alert(data);
			}
		});
	}

	function ShowProfile() {
		let $self = Init;
		let output = '';
		$.ajax({
			url: 'model/profile.php',
			type: 'get',
			data: {'action' : 'view',},
			dataType: 'json',
			success:function(data) {
				for (i=0; i<data.length; i++) {
					output += "<div>"+data[i].fullname+"</div>";
				}
				$self.form_profile.html(output);
				
			}
		});
	}
});

