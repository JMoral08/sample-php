<?php

use Core\App;
use Core\Validator;
use Core\Database;

$db = App::resolve(Database::class);


$email = $_POST['email'];
$password = $_POST['password'];

// validate the forms inputs.

$errors = [];

if(! Validator::email($email)) {
    $errors['email'] = 'Please provide a valid email address.';
}

if(! Validator::string($password, 7, 255)) {
    $errors['password'] = 'Please provide a password at least seven chracters.';
}

if(!empty($errors)) {
    return view('registration/create.views.php', [
        'errors' => $errors
    ]);
}

//check if the account already exist.

$user = $db->query('select * from users where email = :email', [
    'email' => $email
])->find();

if($user) {

    // then someone with that already exist and has an account.
    // If yes,m redirect to a login page.
    
    header('location: /');
    exit();

} else {

    // If not, save one to the database, and then log the user in, and redirect.

    $db->query('INSERT INTO users(email,password) VALUES(:email, :password)', [
        'email' => $email,
        'password' => password_hash($password, PASSWORD_BCRYPT)
    ]);

    // mark that the user has logged in.


    login($users);

    header('location: /');
    exit();
}