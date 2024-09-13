document.addEventListener("DOMContentLoaded", function() {
    // Esconde o spinner após o carregamento da página para garantir que não apareça por engano
    document.getElementById('loading-overlay').style.display = 'none';

    // Função de login
    async function login() {
        // Obter os valores dos campos
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        // Validar se os campos estão preenchidos
        if (!login || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Mostrar a sobreposição de carregamento
        document.getElementById('loading-overlay').style.display = 'flex';

        console.log("Antes")

        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                login, password
            })
        });

        console.log("Depois")

        if (!(response.status >= 200 && response.status < 300)) {



            const response = await fetch('http://localhost:3000/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    nome: nome, 
                    login: nome,  // Ajuste aqui: use a variável correta para login
                    email: email, 
                    telefone: telefone, 
                    senha: senha 
                })
            });
            const { code, message, status } = await response.json();
            alert('Login ou senha incorretos.');
            console.error(`Erro ${status} (${code}): ${message}`);
        } else {

            const loginResponseData = await response.json();
            localStorage.setItem('userId', loginResponseData.id);
            window.location.href = 'mainS.html';
        }

    }

    // Vincula a função login ao botão
    document.querySelector("button").addEventListener("click", login);
});
