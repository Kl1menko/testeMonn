<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$jsonText = $_POST['Товары'];
$myArray = json_decode($jsonText, true);

$prod = '';

$name = $_POST['nameFF'];
$surname = $_POST['surnameFF'];
$phone = $_POST['phoneFF'];
$email = $_POST['emailFF'];
$address = $_POST['addressFF'];
$city = $_POST['cityFF'];
$wojew = $_POST['wojewFF'];
$codepocta = $_POST['codepoctaFF'];
$finalPrice = $_POST['finalPriceFF'];
$ckeck = $_POST['checkFF'];
$token = "1627317590:AAEQ269q_ZceGT6RQJjDNiTWrY-cDUK6qow";
$chat_id = "-553229403";
$arr = array(
  'Имя: ' => $name,
  'Фамилия: ' => $surname,
  'Телефон: ' => $phone,
  'Email:' => $email,
  'Адресс:' => $address,
  'Город:' => $city,
  'Область:' => $wojew,
  'Индекс:' => $codepocta,
  'ЦЕНА:' => $finalPrice,
  'Рассылка:' => $check
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

foreach ($myArray as $key => $value) {
    $id = $value["id"];
    $title = $value["title"];
    $size = $value["size"];
    $color = $value["color"];
    $price = $value["price"];
    $prod .= "
    <b>ID товара:</b> $id%0A
    <b>Название товара:</b> $title%0A
    <b>Размер:</b> $size%0A
    <b>Цвет:</b> $color%0A
    <b>Цена:</b> $price%0A%0A%0A";
}

$c = true;

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$prod}","r");

if ($sendToTelegram && $sendToTelegram2) {
  header('Location: Thanks.html');
} else {
  echo "Error";
}
?>