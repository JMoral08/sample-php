<?php

use Core\App;
use Core\Database;

$db = App::resolve(Database::class);

$notes = $db->query('select * from notes where user_id = 1')->get();

view("notes/index.views.php", [
    'heading' => 'Notes Page',
    'notes' => $notes
]);
