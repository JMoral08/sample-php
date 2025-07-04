$(document).ready( function() {
let Init = {
	text_username 			: $("#txt-username"),
	text_password 			: $("#txt-password"),
	form_login  			: $("#form-login"),
	button_login 			: $("#btn-login"),
	button_login_loading  	: $("#btn-login-loading") 
};
Init.button_login.on('click', Login);
Login();
FormCancel();

function FormCancel() {
	let $self = Init;
		$self.form_login[0].reset();
		$self.button_login_loading.hide();
}

function Login() {
	let $self = Init;
	if($self.text_username.val() == '' ) {
		$self.text_username.focus();
	} else if ($self.text_password.val() == '' ) {
		$self.text_password.focus();
	} else {
		let data = {
			'action' 		: "login",
			'username' 		: $self.text_username.val(),
			'password' 		: $self.text_password.val()
		};
		$.post({
			url: 'model/login.php',
			method: 'post',
			data: data,
			beforeSend:function() {
				$self.button_login.hide();
				$self.button_login_loading.show();
        		setTimeout(function() {
        			th.submit();
        		}, 3000);
			},
			success:function(data) {
				if(data == 'Admin Login Successful!') {
					$(window).attr('location','user.php');
					return;
				} else if (data == 'User Login Successful!') {
					$(window).attr('location','order.php');
					return;
				} else {
					Swal.fire({
					  icon: "warning",
					  title: "Oops...",
					  text: data,
					});
					$self.button_login.show();
					$self.button_login_loading.hide();
				}
			}
		});
	}
}

});
