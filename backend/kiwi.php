<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : null;

if (!$type) {
    echo 'Missing parameters';
    return;
}

$KIWI_BASE_URL = $_ENV['KIWI_BASE_URL'];
$KIWI_REALM_ID = $_ENV['KIWI_REALM_ID'];

switch ($type) {
    case 'menu':

        $query = $KIWI_BASE_URL . '/dining_menu?realm_id=' . $KIWI_REALM_ID;

        $result = file_get_contents($query);

        echo $result;

        break;
}
