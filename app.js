require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Usa a porta definida no .env ou 3000 por padrão

// Middleware
app.use(express.json()); // Processa JSON no corpo das requisições
app.use(cors()); // Permite requisições de diferentes origens

// Rota principal
app.get('/', (req, res) => {
    res.status(200).json({ message: '✅ Servidor rodando corretamente!' });
});

// Middleware de erro (captura exceções)
app.use((err, req, res, next) => {
    console.error('❌ Erro no servidor:', err);
    
    if (!res.headersSent) { // Evita múltiplas respostas
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});


