// Função para cadastrar um novo tema
async function cadastrarTema() {
    const nomeTema = document.getElementById('nomeTema').value;

    if (!nomeTema) {
        alert('Por favor, insira o nome do tema.');
        return;
    }

    try {
        const result = await fetch('http://localhost:3000/tema/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nomeTema })
        });

        if (result.ok) {
            alert('Tema cadastrado com sucesso!');
            document.getElementById('formTema').reset(); // Limpa o formulário
        } else {
            alert('Erro ao cadastrar tema. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro ao cadastrar tema:', erro);
        alert('Erro ao se conectar com o servidor.');
    }
}

// Função para cadastrar um novo professor
async function cadastrarProfessor() {
    const nomeProfessor = document.getElementById('nomeProfessor').value;

    if (!nomeProfessor) {
        alert('Por favor, insira o nome do professor.');
        return;
    }

    try {
        const result = await fetch('http://localhost:3000/professor/', { // Endpoint para cadastrar professor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nomeProfessor })
        });

        if (result.ok) {
            alert('Professor cadastrado com sucesso!');
            document.getElementById('formProfessor').reset(); // Limpa o formulário
        } else {
            alert('Erro ao cadastrar professor. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro ao cadastrar professor:', erro);
        alert('Erro ao se conectar com o servidor.');
    }
}
