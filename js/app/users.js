$(document).ready(function() {

let Init = {
	label_user              : $("#lbl-user"),
    label_users             : $("#lbl-users"),
	tbody_generate_user 	: $("#tbody-generate-user"),
	button_remove 			: $("#btn-remove")
};
Init.tbody_generate_user.on('click', '#btn-remove', removeUser);
generateUser();

function removeUser() {
	let $self = Init;
	let mythis = this;
	let data = {
		'action' : 'remove',
		'id' : $(this).attr('data-id')
	}
	$.ajax({
		url: 'model/user.php',
		type: 'post',
		data: data,
		success:function(data) {
			Swal.fire({
				title: data,
				text: "Your file has been remove.",
				icon: "success"
			}).then([
				$(mythis).closest('tr').remove()
			]);
			$(mythis).closest('tr').remove();
		}
	});
}

function generateUser() {
	let $self = Init;
	let output = '';
	$.post({
		url: 'model/user.php',
		type: 'post',
		data: {'action' : 'user'},
		dataType: 'json',
		success:function(data) {
			for(i=0; i<data.length; i++) {
				output += "<tr people_id='"+data[i].people_id+"'>"+
						"<td style='width:20em;' class='text-uppercase'><i class='bi bi-person-square text-primary'></i> "+data[i].fullname+"<p style='font-size: 2vh;' class='text-muted'>Registered: "+data[i].datecreated+"</p> </td>"+
						"<td>"+data[i].username+"</td>"+
						"<td>"+data[i].password+"</td>"+
						"<td>"+data[i].email+"</td>"+
						"<td class='text-center text-capitalize'>"+data[i].user_type+"</td>"+
						"<td class='text-center'>"+
							"<div class='dropstart'>"+
								"<button class='btn btn-link fs-5 text-black-50' data-bs-toggle='dropdown' aria-expanded='false'><i class='bi bi-three-dots'></i></button>"+
								"<ul class='dropdown-menu text-uppercase'>"+
									"<li class='dropdown-header'><i class='bi bi-three-dots-vertical'></i> Actions</li>"+
									"<li><hr class='dropdown-divider'></li>"+
									"<li><a href='profile.php?id="+data[i].id+"' class='dropdown-item text-dark' id='btn-view'><i class='bi bi-eye'></i> View User</a></li>"+
									"<li><a href='#'class='dropdown-item text-danger' id='btn-remove' data-id='"+data[i].id+"'><i class='bi bi-trash3'></i> Remove to User</a></li>"+
 	 							"</ul>"+
							"</div>"+
						"</td>"+
						"</tr>";
						
			}
			$self.tbody_generate_user.html(output);
		}
	});
}


});