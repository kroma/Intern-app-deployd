<?php


/*  12.09.2012: CHANGED TO SIMPLE PASSTHROUGH OF QUERY STRING, jt@kroma.no

// Initiating the list var

$list = null;
 
// Building the list
foreach($_GET as $field_name => $field_value)
   if(!in_array($field_name, $blocked))
      $list .= "{$field_name}={$field_value}&";

 
// Trimming the ends of the list from any unneeded white spaces
$list = trim($list);
$list = substr($list,0,-1); 

$request = "http://annonse.kroma.no/modules/send_form.php?" . $list;

*/

$request = "http://annonse.kroma.no/modules/send_form.php?" . $_SERVER['QUERY_STRING'];


//print_r($request);
       /* I prefer using CURL */

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$request);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

    echo  $response = curl_exec($ch);
	curl_close ($ch);		 
?>