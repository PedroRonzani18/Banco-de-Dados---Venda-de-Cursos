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

        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                login, password
            })
        });

        if(response.ok) {
            const data = await response.json();
            if(data.success) {
                window.location.href = 'mainS.html';
            } else {
                alert('Login ou senha incorretos.');
            }
        }

        // // Realizar a chamada ao backend
        // fetch('http://localhost:3000/login', {  // <--- Integração com o backend aqui
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ login: login, password: password })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Esconder a sobreposição de carregamento
        //     document.getElementById('loading-overlay').style.display = 'none';

        //     if (data.success) {
        //         // Redirecionar para a página principal
        //         window.location.href = 'mainS.html';
        //     } else {
        //         alert('Login ou senha incorretos.');
        //     }
        // })
        // .catch(error => {
        //     // Esconder a sobreposição de carregamento
        //     document.getElementById('loading-overlay').style.display = 'none';

        //     console.error('Erro ao fazer login:', error);
        //     alert('Erro ao se conectar com o servidor.');
        // });
    }

    // Vincula a função login ao botão
    document.querySelector("button").addEventListener("click", login);
});
