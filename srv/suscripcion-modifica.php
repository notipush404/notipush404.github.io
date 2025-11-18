<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/selectFirst.php";
require_once __DIR__ . "/../lib/php/insert.php";
require_once __DIR__ . "/../lib/php/update.php";
require_once __DIR__ . "/../lib/php/devuelveCreated.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once  __DIR__ . "/Bd.php";
require_once  __DIR__ . "/Suscripcion.php";
require_once  __DIR__ . "/suscripcionRecupera.php";

ejecutaServicio(function () {
 $modelo = suscripcionRecupera();
 $pdo = Bd::pdo();
 if (
  selectFirst($pdo, SUSCRIPCION, [SUS_ENDPOINT => $modelo[SUS_ENDPOINT]])
  === false
 ) {
  insert(pdo: $pdo, into: SUSCRIPCION, values: $modelo);
  devuelveCreated("", $modelo);
 } else {
  update(
   pdo: $pdo,
   table: SUSCRIPCION,
   set: $modelo,
   where: [SUS_ENDPOINT => $modelo[SUS_ENDPOINT]]
  );
  devuelveJson($modelo);
 }
});
