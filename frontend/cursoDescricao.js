document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    fetch(`http://localhost:3000/courses/${courseId}`)
        .then(response => response.json())
        .then(courseData => {
            document.getElementById('courseName').textContent = courseData.name;
            document.getElementById('courseDescription').textContent = courseData.description;
            document.getElementById('courseTeachers').textContent = courseData.teachers;
            document.getElementById('coursePrice').textContent = `R$ ${courseData.price}`;

            const topicsList = document.getElementById('courseTopics');
            topicsList.innerHTML = '';
            courseData.topics.forEach(topic => {
                const li = document.createElement('li');
                li.textContent = topic;
                topicsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar descrição do curso:', error);
        });

    function comprarCurso() {
        window.location.href = `compraCurso.html?id=${courseId}`; // Página de compra a ser implementada
    }
});
