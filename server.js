require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Verifica se as variáveis de ambiente estão definidas
const { MONGO_URI, JWT_SECRET, PORT = 3000 } = process.env;

if (!MONGO_URI) {
    console.error("❌ Erro: MONGO_URI não está definida no arquivo .env");
    process.exit(1);
}
if (!JWT_SECRET) {
    console.error("❌ Erro: JWT_SECRET não está definida no arquivo .env");
    process.exit(1);
}

// Conectar ao MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Conectado ao MongoDB");
        startServer(); // Inicia o servidor apenas após conectar ao banco
    } catch (err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    }
}

// Modelo de Usuário
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true, minlength: 6 },
});

const User = mongoose.model("User", UserSchema);

// Rota de Registro de Usuário
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios!" });
        }

        // Verifica se o usuário já existe
        if (await User.findOne({ username })) {
            return res.status(400).json({ message: "Usuário já cadastrado!" });
        }

        // Criptografa a senha e salva no banco
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "✅ Usuário cadastrado com sucesso!" });

    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
});

// Rota de Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios!" });
        }

        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Usuário ou senha inválidos!" });
        }

        // Gera token JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, message: "✅ Login realizado com sucesso!" });

    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
});

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
});

// Função para iniciar o servidor
function startServer() {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}

// Conectar ao banco e iniciar o servidor
connectDB();

