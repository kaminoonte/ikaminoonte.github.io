<?$ch = curl_init("http://history.radiorecord.ru/index2.php?station=".$_GET['station'].'&day='.$_GET['day']);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
?>