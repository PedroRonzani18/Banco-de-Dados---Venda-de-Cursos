document.addEventListener("DOMContentLoaded", function() {
    // Supondo que o nome do usuário e os cursos sejam obtidos via API
    fetch('http://localhost:3000/user')  // Endereço do backend para obter os dados do usuário
        .then(response => response.json())
        .then(userData => {
            // Exibir o nome do usuário
            document.getElementById('userName').textContent = userData.name;

            // Carregar e renderizar os cursos do usuário
            renderUserCourses(userData.courses);
        })
        .catch(error => {
            console.error('Erro ao carregar dados do usuário:', error);
        });

    function renderUserCourses(courses) {
        const grid = document.getElementById('userCoursesGrid');
        grid.innerHTML = ''; // Limpar o grid antes de renderizar
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.name}">
                <h3>${course.name}</h3>
                <p><strong>Carga Horária:</strong> ${course.hours}</p>
            `;
            courseCard.addEventListener('click', () => {
                window.location.href = `curso.html?id=${course.id}`;
            });
            grid.appendChild(courseCard);
        });
    }


});
    // Função para redirecionar ao lançar um curso
    function lancarCurso() {
        window.location.href = 'lancarCurso.html'; // Página a ser implementada
    }

    // Função para redirecionar aos certificados do usuário
    function verCertificados() {
        window.location.href = 'certificados.html'; // Página a ser implementada
    }