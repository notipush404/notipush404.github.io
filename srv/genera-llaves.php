<!DOCTYPE html>
<html lang="es">

<head>

 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width">

 <title>Llaves VAPID</title>

</head>

<body>

 <h1>Llaves VAPID</h1>

 <pre>
 <?php

 require __DIR__ . "/../vendor/autoload.php";

 use Minishlink\WebPush\VAPID;

 var_dump(VAPID::createVapidKeys());

 ?>
 </pre>

</body>

</html>