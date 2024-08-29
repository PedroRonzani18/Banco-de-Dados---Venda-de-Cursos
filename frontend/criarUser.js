document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('createAccountForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio do formulário padrão

        // Obter os valores dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;

        // Verificar se o nome, email e telefone são válidos

        if (!validateName(nome)) {
            alert('Por favor, insira seu nome completo.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        if (!validatePhone(telefone)) {
            alert('Por favor, insira um telefone válido.');
            return;
        }

        // Verificar se a senha é válida
        if (!validatePassword(senha)) {
            alert('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

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

        const responseData = await response.json();

        console.dir({ responseData }, { depth: null });

        if(response.ok) {
            alert('Conta criada com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Erro ao criar a conta. Tente novamente.');
        }

        
    });


    function validateName(name) {
        const names = name.trim().split(/\s+/); // Dividir o nome em partes, removendo espaços extras
        return names.length >= 2 && names.every(n => n.length >= 3);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/; // Formato para telefones brasileiros com 10 ou 11 dígitos
        return re.test(String(phone));
    }

    function validatePassword(password) {
        return password.length >= 8;
    }
});
