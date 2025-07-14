<?php

use Core\App;
use Core\Validator;
use Core\Database;

$db = App::resolve(Database::class);

$errors = [];
$title = $_POST['title'];
$body = $_POST['body'];

    
if(! Validator::string($body, 1, 1000)) {
    $errors['body'] = 'A body of no more than 1,000 characters is required.';
}

if(! empty($errors)) {
    return view("notes/create.views.php", [
        'errors' => $errors
    ]);
}

$db->query('INSERT INTO notes(title,body,user_id) VALUES(:title, :body, :user_id)', [
    'title' => $title,
    'body' => $body,
    'user_id' => 1
]);


header('location: /notes');
die();