<?php

require_once __DIR__ . "/../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/validaJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_SUSCRIPCION.php";

function suscripcionRecupera()
{

 $objeto = recuperaJson();
 $objeto = validaJson($objeto);

 if (!isset($objeto->publicKey)  || !is_string($objeto->publicKey))
  throw new ProblemDetails(
   type: "/error/publickeyincorrecta.html",
   status: BAD_REQUEST,
   title: "La publicKey debe ser texto.",
  );

 if (!isset($objeto->authToken) || !is_string($objeto->authToken))
  throw new ProblemDetails(
   type: "/error/authtokenincorrecto.html",
   status: BAD_REQUEST,
   title: "El authToken debe ser texto.",
  );

 if (!isset($objeto->contentEncoding) || !is_string($objeto->contentEncoding))
  throw new ProblemDetails(
   type: "/error/contentencodingincorrecta.html",
   status: BAD_REQUEST,
   title: "La contentEncoding debe ser texto.",
  );

 return [
  SUS_ENDPOINT => $objeto->endpoint,
  SUS_PUB_KEY => $objeto->publicKey,
  SUS_AUT_TOK => $objeto->authToken,
  SUS_CONT_ENCOD => $objeto->contentEncoding
 ];
}
