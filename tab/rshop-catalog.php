<?$ch = curl_init("http://rshop.radiorecord.ru/vk3/");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
?>