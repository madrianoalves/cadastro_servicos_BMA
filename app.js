// Importa o Express
const express = require('express');
const path = require('path');

// Cria a instância do servidor Express
const app = express();

// Define a porta onde o servidor vai rodar
const port = 3000;

// Configura o diretório onde o arquivo index.html está localizado
const publicDirectoryPath = path.join(__dirname, 'public');

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(publicDirectoryPath));

// Cria a rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


