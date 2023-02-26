<?php

/* https://api.telegram.org/bot1419603857:AAHDECiL3Idk3zT8VrohglZHzO17nfy_Px8/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$phone = $_POST['user_messange'];
$email = $_POST['user_email'];
$token = "1419603857:AAHDECiL3Idk3zT8VrohglZHzO17nfy_Px8";
$chat_id = "-418178716";
$arr = array(
  'Имя пользователя: ' => $name,
  'Email' => $email,
  'Сообщение: ' => $phone
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>