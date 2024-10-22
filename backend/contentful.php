<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once 'vendor/autoload.php';

$entry_id = isset($_GET['entry_id']) ? htmlspecialchars($_GET['entry_id']) : null;
$type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : null;
$name = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : null;

if (!$entry_id || !$type || !$name) {
    echo 'Missing parameters';
    return;
}

$CONTENTFUL_SPACE_ID = $_ENV['CONTENTFUL_SPACE_ID'];
$CONTENTFUL_ACCESS_TOKEN = $_ENV['CONTENTFUL_ACCESS_TOKEN'];
$CONTENTFUL_LOCALE = 'en-US';

use Contentful\Delivery\Client as ContentfulClient;

try {
    $client = new ContentfulClient(
        $CONTENTFUL_ACCESS_TOKEN,
        $CONTENTFUL_SPACE_ID,
        'master' // Defaults to "master" if omitted
    );

    $entry = $client->getEntry($entry_id, $CONTENTFUL_LOCALE);

    switch ($type) {
        case 'field':
            echo $entry[$name];

            break;
        case 'image':
            $image = $entry[$name];
            $fileObject = $image->getFile($CONTENTFUL_LOCALE);
            $imageUrl = $fileObject->getUrl();
            echo $imageUrl;

            break;
    }
} catch (\Exception $e) {
    error_log('Error fetching entry: ' . $e->getMessage());
    echo 'An error occurred while fetching the entry.';
}
