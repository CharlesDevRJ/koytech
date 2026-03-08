<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://koytech.com.br');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Preencha todos os campos obrigatórios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'E-mail inválido']);
    exit;
}

// Previne header injection
$name    = str_replace(["\r", "\n"], ' ', $name);
$email   = str_replace(["\r", "\n"], '', $email);
$subject = str_replace(["\r", "\n"], ' ', $subject);

$to           = 'contatokoytech@gmail.com';
$subject_line = 'Novo contato via koytech.com.br' . ($subject ? ' — ' . $subject : '');

$body  = "Novo contato recebido pelo site koytech.com.br\n";
$body .= str_repeat('-', 40) . "\n\n";
$body .= "Nome:    $name\n";
$body .= "E-mail:  $email\n";
$body .= "Serviço: $subject\n\n";
$body .= "Mensagem:\n$message\n";

$headers  = "From: no-reply@koytech.com.br\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject_line, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Falha ao enviar. Tente pelo WhatsApp.']);
}
