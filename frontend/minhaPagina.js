document.addEventListener("DOMContentLoaded", async function() {
    // Supondo que o nome do usuário e os cursos sejam obtidos via API

    const response = await fetch('http://localhost:3000/user/id/28', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!(response.status >= 200 && response.status < 300)) {
        const { code, message, status } = await response.json();
        alert('Erro na obtenção dos dados do usuário.');
        console.error(`Erro ${status} (${code}): ${message}`);
        return;
    }

    const userData = await response.json();
    document.getElementById('userName').textContent = userData.nome;

    const courses = await fetch('http://localhost:3000/curso/list/28', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!(courses.status >= 200 && courses.status < 300)) {
        const { code, message, status } = await courses.json();
        alert('Erro na obtenção dos cursos do usuário.');
        console.error(`Erro ${status} (${code}): ${message}`);
        return;
    }

    const userCourses = await courses.json();
    
    console.dir({userCourses})
    
    renderUserCourses(userCourses);

    // fetch('http://localhost:3000/user')  // Endereço do backend para obter os dados do usuário
    //     .then(response => response.json())
    //     .then(userData => {
    //         // Exibir o nome do usuário
    //         document.getElementById('userName').textContent = userData.name;

    //         // Carregar e renderizar os cursos do usuário
    //         renderUserCourses(userData.courses);
    //     })
    //     .catch(error => {
    //         console.error('Erro ao carregar dados do usuário:', error);
    //     });

    function renderUserCourses(courses) {
        const grid = document.getElementById('userCoursesGrid');
        grid.innerHTML = ''; // Limpar o grid antes de renderizar
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <img src="${course.imagem}" alt="${course.nome}">
                <h3>${course.nome}</h3>
                <p><strong>Carga Horária:</strong> ${course.cargaHora}</p>
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