<?php
require __DIR__ . '/env.php';
require __DIR__ . '/cors.php';
require_once __DIR__ . '/vendor/autoload.php';

$entry_id = isset($_GET['entry_id']) ? htmlspecialchars($_GET['entry_id']) : null;
$type = isset($_GET['type']) ? htmlspecialchars($_GET['type']) : null;
$name = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : null;
$params = isset($_GET['params']) ? $_GET['params'] : null;

if (!$type) {
    echo 'Missing parameters';
    return;
}

$CONTENTFUL_BASE_URL = $_ENV['CONTENTFUL_BASE_URL'];
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

    switch ($type) {
        case 'entries':
            $query = $CONTENTFUL_BASE_URL
                . '/spaces/'
                . $CONTENTFUL_SPACE_ID
                . '/environments/master/entries?include=1';

            if ($params) {
                $decodedParams = json_decode($params, true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    $query .= '&' . http_build_query($decodedParams);
                } else {
                    echo 'Invalid JSON in params';
                    return;
                }
            }

            error_log("Constructed Contentful query URL: " . $query);

            $options = [
                "http" => [
                    "header" => "Authorization: Bearer " . $CONTENTFUL_ACCESS_TOKEN
                ]
            ];

            $context = stream_context_create($options);
            $result = file_get_contents($query, false, $context);

            file_put_contents(__DIR__ . '/contentful_response.txt', $CONTENTFUL_BASE_URL);

            echo $result;

            break;
        case 'test':
            echo "Works great!";

            break;
    }
} catch (\Exception $e) {
    error_log('Error fetching entry: ' . $e->getMessage());
    echo 'An error occurred while fetching the entry.';
}
