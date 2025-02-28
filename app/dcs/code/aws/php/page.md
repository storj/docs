---
title: AWS SDK PHP
docId: LuaGgrbZ9rKbWtDMXhFWG
---

## 1. Install or include the Amazon S3 SDK

e.g. with composer

```none
composer require aws/aws-sdk-php
```

### 2. Import the S3 Client

```php
use Aws\S3\S3Client;
```

### 3. Create S3 Client

```php
$s3 = new S3Client([
            'version' => 'latest',
            'endpoint' => 'https://gateway.storjshare.io',
            'credentials' =>  [
                'key' => 'your_key',
                'secret' => 'your_secret'
      ],
]);
```

### 4. List of objects

```php
$results = $s3->getPaginator('ListObjects', [
                'Bucket' => 'your_bucket'
            ]
);
        
foreach ($results as $result) {
    foreach ($result['Contents'] as $object) {
        echo $object['Key'] . PHP_EOL;
    }
}
```

### 5. Get one object

```php
$result = $s3->getObject([
            'Bucket' => 'your_bucket_name',
            'Key' => $id, // Name of object e.g. image.png
]);

header('Content-Type: ' . $result['ContentType']);
echo $result['Body'];
```

### 6. Upload an object

```php
$s3->putObject([
    'Bucket' => 'your_bucket',
    'Key' => $key,
    'Body' => $image_base64,
    'ContentType' => $content_type,
]);
```
