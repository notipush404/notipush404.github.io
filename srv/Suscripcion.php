<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Minishlink\WebPush\SubscriptionInterface;

class Suscripcion implements SubscriptionInterface
{

 public string $SUS_ENDPOINT;
 public string $SUS_PUB_KEY;
 public string $SUS_AUT_TOK;
 public string $SUS_CONT_ENCOD;

 public function __construct(
  string $SUS_ENDPOINT = "",
  string $SUS_PUB_KEY = "",
  string $SUS_AUT_TOK = "",
  string $SUS_CONT_ENCOD = ""
 ) {
  $this->SUS_ENDPOINT = $SUS_ENDPOINT;
  $this->SUS_PUB_KEY = $SUS_PUB_KEY;
  $this->SUS_AUT_TOK = $SUS_AUT_TOK;
  $this->SUS_CONT_ENCOD = $SUS_CONT_ENCOD;
 }

 public function getEndpoint(): string
 {
  return $this->SUS_ENDPOINT;
 }

 public function getPublicKey(): ?string
 {
  return $this->SUS_PUB_KEY;
 }

 public function getAuthToken(): ?string
 {
  return $this->SUS_AUT_TOK;
 }

 public function getContentEncoding(): ?string
 {
  return $this->SUS_CONT_ENCOD;
 }
}
