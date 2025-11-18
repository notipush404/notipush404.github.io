<?php

class Bd
{

 private static ?PDO $pdo = null;

 static function pdo(): PDO
 {
  if (self::$pdo === null) {

   self::$pdo = new PDO(
    // cadena de conexión
    "sqlite:notificacionespush.db",
    // usuario
    null,
    // contraseña
    null,
    // Opciones: pdos no persistentes y lanza excepciones.
    [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
   );

   self::$pdo->exec(
    'CREATE TABLE IF NOT EXISTS SUSCRIPCION (
       SUS_ENDPOINT TEXT NOT NULL,
       SUS_PUB_KEY TEXT NOT NULL,
       SUS_AUT_TOK TEXT NOT NULL,
       SUS_CONT_ENCOD TEXT NOT NULL,
      CONSTRAINT SUS_PK
       PRIMARY KEY(SUS_ENDPOINT),
      CONSTRAINT SUS_ENDPNT_NV
       CHECK(LENGTH(SUS_ENDPOINT) > 0)
     )'
   );
  }

  return self::$pdo;
 }
}
