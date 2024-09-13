document.addEventListener("DOMContentLoaded", async function() {
    // Obtenção dos dados do usuário
    const response = await fetch(`http://localhost:3000/user/id/${localStorage.getItem('userId')}`, {
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

    // Obtenção dos cursos do usuário
    const courses = await fetch(`http://localhost:3000/curso/list/${localStorage.getItem('userId')}`, {
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
    
    console.dir({userCourses});
    
    renderUserCourses(userCourses);

    // Função para renderizar os cursos do usuário
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
                <button onclick="editarCurso(${course.id})">Editar Curso</button>
            `;
            courseCard.querySelector('img').addEventListener('click', () => {
                window.location.href = `curso.html?id=${course.id}`;
            });
            grid.appendChild(courseCard);
        });
    }

    // Função para redirecionar ao editar um curso
    window.editarCurso = function(courseId) {
        window.location.href = `editarCurso.html?courseId=${courseId}`;
    };

    // Função para redirecionar ao lançar um curso
    window.lancarCurso = function() {
        window.location.href = 'lancarCurso.html';
    };

    // Função para redirecionar aos certificados do usuário
    window.verCertificados = function() {
        window.location.href = 'certificados.html';
    };

    // Função para redirecionar para a página de cadastro de tema ou professor
    window.cadastrarTemaProfessor = function() {
        window.location.href = 'cadastrarTemaProfessor.html'; // Página de cadastro de tema ou professor
    };

    // Atribuir eventos de clique aos botões da página
    document.getElementById('btnLancarCurso').addEventListener('click', lancarCurso);
    document.getElementById('btnVerCertificados').addEventListener('click', verCertificados);
    document.getElementById('btnCadastrarTemaProfessor').addEventListener('click', cadastrarTemaProfessor);
});
