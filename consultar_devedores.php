<?php
// Conexão com o banco de dados
$conn = new mysqli("localhost", "seu_usuario", "sua_senha", "seu_banco_de_dados");

// Verificação da conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Consulta SQL para buscar devedores com base no valor recebido
$input = $_GET['input'];
$sql = "SELECT * FROM devedores WHERE nome LIKE '%$input%'"; // Ajuste de acordo com sua estrutura de banco de dados

// Executa a consulta
$result = $conn->query($sql);

// Exibe os resultados
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Nome: " . $row["nome"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "Nenhum devedor encontrado.";
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
