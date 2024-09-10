document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    const response = await fetch(`http://localhost:3000/curso/id/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    })

    if (!response.ok) {
        console.error('Erro ao carregar descrição do curso:', response.status);
        return;
    }

    const courseData = await response.json();

    document.getElementById('courseName').textContent = courseData.nome;
    document.getElementById('courseDescription').textContent = courseData.descricao;
    document.getElementById('courseTeachers').textContent = "AINDA NAO IMPLEMENTADO"
    document.getElementById('coursePrice').textContent = `R$ ${courseData.preco}`;

    const topicosResponse = await fetch(`http://localhost:3000/topico/list/${courseData.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    })

    const topicoResponseData = await topicosResponse.json();

    const topicsList = document.getElementById('courseTopics');
    topicsList.innerHTML = '';
    topicoResponseData.forEach(topic => {

        const li = document.createElement('li');
        li.textContent = topic.titulo;
        topicsList.appendChild(li);
    });

    function comprarCurso() {
        window.location.href = `compraCurso.html?id=${courseId}`; // Página de compra a ser implementada
    }
});
