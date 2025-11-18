<?php

require_once __DIR__ . "/../lib/php/delete.php";
require_once  __DIR__ . "/TABLA_SUSCRIPCION.php";

function suscripcionElimina(PDO $pdo, string $endpoint)
{
 delete(pdo: $pdo, from: SUSCRIPCION, where: [SUS_ENDPOINT => $endpoint]);
}
