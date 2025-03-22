function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulação de verificação de login (seria feito com backend real)
    if (username === "admin" && password === "senha123") {
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('serviceForm').style.display = 'block';
    } else {
      alert("Usuário ou senha inválidos.");
    }
  }
  
  document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const servico = document.getElementById('servico').value;
    const producao = document.getElementById('producao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    const endereco = document.getElementById('endereco').value;
    const status = document.getElementById('status').value;
    const total = document.getElementById('total').value;
  
    const dados = {
      servico,
      producao,
      valor,
      data,
      endereco,
      status,
      total
    };
  
    fetch('/api/cadastrar-servico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
      alert('Serviço cadastrado com sucesso!');
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  });
  