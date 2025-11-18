<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once  __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveNoContent.php";
require_once  __DIR__ . "/Bd.php";
require_once  __DIR__ . "/suscripcionRecupera.php";
require_once  __DIR__ . "/suscripcionElimina.php";

ejecutaServicio(function () {

 $modelo = suscripcionRecupera();
 suscripcionElimina(Bd::pdo(), $modelo[SUS_ENDPOINT]);
 devuelveNoContent();
});
