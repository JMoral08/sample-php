<?php

use Core\App;
use Core\Database;
use Core\Validator;

$db = App::resolve(Database::class);

$currentUserId = 1;

$note = $db->query('select * from notes where id = :id', [
        'id' => $_POST['id']
    ])->findOrFail();

authorized($note['user_id'] == $currentUserId);

$errors = [];

if(! Validator::string($_POST['body'], 1, 1000)) {
    $errors['body'] = 'A body of no more than 1,000 characters is required.';
}

if(count($errors)) {
    return view('notes/edit.views.php', [
        'errors' => $errors,
        'note' => $note
    ]);
}

$db->query('update notes set title = :title, body = :body where id = :id ', [
    'id' => $_POST['id'],
    'title' => $_POST['title'],
    'body' => $_POST['body']
]);

header('location: /notes');
die();