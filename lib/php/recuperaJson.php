<?php

function recuperaJson()
{
 return json_decode(file_get_contents("php://input"));
}
