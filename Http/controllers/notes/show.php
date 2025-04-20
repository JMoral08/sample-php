<?php

use Core\App;
use Core\Database;

$db = App::resolve(Database::class);

$currentUserId = 1;

$note = $db->query('select * from notes where id = :id', [
        'id' => $_GET['id']
    ])->findOrFail();

authorized($note['user_id'] == $currentUserId);


view("notes/show.views.php", [
    'heading' => 'Notes List',
    'note' => $note
]);
