<?php

use Core\Session;

view('session/create.views.php', [
    'errors' => Session::get('errors')
]);