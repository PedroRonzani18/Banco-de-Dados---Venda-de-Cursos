document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId'); // Substitua pelo ID do usuário atual
    const courseId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID do curso da URL

    try {
        console.log('courseId:', courseId);

        // Buscar os detalhes do curso
        const courseResponse = await fetch(`http://localhost:3000/curso/id/${courseId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const listProfessoresResponse = await fetch(`http://localhost:3000/curso/list/professores/${courseId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const listTopicosResponse = await fetch(`http://localhost:3000/curso/list/temas/${courseId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const nomesProfessores = listProfessoresResponse.ok ? await listProfessoresResponse.json() : [];
        const topicos = listTopicosResponse.ok ? await listTopicosResponse.json() : [];

        if (courseResponse.ok) {
            const course = await courseResponse.json();
            document.getElementById('courseName').textContent = course.nome;
            document.getElementById('courseDescription').textContent = course.descricao;
            document.getElementById('coursePrice').textContent = `R$ ${course.preco.toFixed(2)}`;
            document.getElementById('courseTeachers').textContent = nomesProfessores.join(', ');
            renderTopics(topicos); // Corrigido para garantir que os tópicos sejam renderizados corretamente
        } else {
            console.error('Erro ao buscar detalhes do curso:', courseResponse.statusText);
        }
    } catch (error) {
        console.error('Erro na conexão com o servidor:', error);
    }
});

// Função para renderizar tópicos do curso
function renderTopics(topics) {
    const topicsList = document.getElementById('courseTopics');

    const set = new Set();
    for(const topic of topics) set.add(topic);

    const topicsArr = Array.from(set);

    console.log('topicsList:', topicsArr);

    if (!topicsList) {
        console.error('Elemento com ID "courseTopics" não encontrado.');
        return;
    }
    topicsList.innerHTML = ''; // Limpar lista de tópicos
    topicsArr.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        topicsList.appendChild(li);
    });
}

// Função para comprar o curso
window.comprarCurso = async function () {
    const userId = localStorage.getItem('userId'); // Substitua pelo ID do usuário atual
    const courseId = new URLSearchParams(window.location.search).get('id');

    const confirmacao = confirm("Deseja realmente comprar este curso?");
    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:3000/matriculado/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    usuarioId: Number(userId),
                    cursoId: Number(courseId)
                 })
            });

            if (response.ok) {
                alert('Curso comprado com sucesso!');
                window.location.href = 'mainS.html'; // Redireciona para a página "Minha Página"
            } else {
                alert('Erro ao comprar o curso.');
                console.error('Erro ao comprar o curso:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na conexão com o servidor:', error);
            alert('Erro ao se conectar com o servidor.');
        }
    }
};
