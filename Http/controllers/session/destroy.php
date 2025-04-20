<?php
// log the user out
use Core\Session;

Session::destroy();

header('location: /');
exit();