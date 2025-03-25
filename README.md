<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de Cadastros</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Lista de Cadastros</h1>

  <!-- Campos de filtro -->
  <label>Buscar por Nome:</label>
  <input type="text" id="searchNome" onkeyup="filterTable()">

  <label>Buscar por Cidade:</label>
  <input type="text" id="searchCidade" onkeyup="filterTable()">

  <label>Buscar por Data:</label>
  <input type="date" id="searchData" onchange="filterTable()">

  <label>Buscar por Número:</label>
  <input type="number" id="searchNumero" onkeyup="filterTable()">

  <table border="1">
    <thead>
      <tr>
        <th>Serviço</th>
        <th>Produção</th>
        <th>Valor</th>
        <th>Data</th>
        <th>Endereço</th>
        <th>Status</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody id="cadastroList">
      <!-- Os cadastros serão inseridos aqui -->
    </tbody>
  </table>

  <br>
  <!-- Botão para voltar à página inicial -->
  <button onclick="window.location.href='index.html'">Voltar</button>

  <script src="script.js"></script>
  <script>
    window.onload = loadCadastros;
  </script>
</body>
</html>
