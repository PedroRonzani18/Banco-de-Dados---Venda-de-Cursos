let allCourses = [];
let userCourses = [];

document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId');
    const userCoursesGrid = document.getElementById('userCoursesGrid');
    const coursesGrid = document.getElementById('coursesGrid');

    const frequencias = await fetch('http://localhost:3000/tema/frequencia', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const frequenciasData = await frequencias.json();

    console.dir(frequenciasData, { depth: null });

    // Renderizar as três caixas acima de "Continuar Assistindo"
    renderFrequencyBoxes(frequenciasData.slice(0, 3));

    // Buscar cursos que o usuário está matriculado (inscrito)
    const userCoursesResponse = await fetch(`http://localhost:3000/curso/list/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (userCoursesResponse.ok) {
        userCourses = await userCoursesResponse.json();
        renderCourses(userCourses, userCoursesGrid, true); // Passa 'true' para indicar cursos do usuário
    } else {
        console.error('Erro ao buscar cursos do usuário:', userCoursesResponse.statusText);
    }

    // Buscar todos os cursos que o usuário não está matriculado e não é dono
    const allCoursesResponse = await fetch(`http://localhost:3000/curso/list/notuser/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (allCoursesResponse.ok) {
        allCourses = await allCoursesResponse.json();
        const allCoursesMinusUserCourses = allCourses.filter(course => !userCourses.some(userCourse => userCourse.id === course.id));

        console.dir(allCoursesMinusUserCourses, { depth: null });
        renderCourses(allCoursesMinusUserCourses, coursesGrid, false); // Passa 'false' para indicar cursos não pertencentes ao usuário
    } else {
        console.error('Erro ao buscar todos os cursos:', allCoursesResponse.statusText);
    }
});

// Função para renderizar as caixas de frequência
function renderFrequencyBoxes(frequencies) {
    const frequencyContainer = document.createElement('div');
    frequencyContainer.className = 'frequency-container';

    frequencies.sort((a, b) => b.freq - a.freq); // Ordenar por frequência decrescente

    frequencies.forEach(frequency => {
        const box = document.createElement('div');
        box.className = 'frequency-box';
        box.innerHTML = `<p><strong>Tema:</strong> ${frequency.nome}</p><p><strong>Frequencia:</strong> ${frequency.freq}</p>`;
        frequencyContainer.appendChild(box);
    });

    const header = document.querySelector('header');
    document.body.insertBefore(frequencyContainer, header.nextSibling); // Inserir abaixo do header
}

// Função para renderizar os cursos em um grid
function renderCourses(courses, gridElement, isUserCourse) {
    gridElement.innerHTML = ''; // Limpar o grid antes de renderizar
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <img src="${course.imagem}" alt="${course.nome}">
            <h3>${course.nome}</h3>
            <p><strong>Carga Horária:</strong> ${course.cargaHora}</p>
        `;
        
        // Definir a ação de clique dependendo se o curso pertence ao usuário ou não
        if (isUserCourse) {
            courseCard.addEventListener('click', () => {
                window.location.href = `cursoUsuario.html?id=${course.id}`; // Página de uso do curso
            });
        } else {
            courseCard.addEventListener('click', () => {
                window.location.href = `cursoDescricao.html?id=${course.id}`; // Página de descrição/compra do curso
            });
        }

        gridElement.appendChild(courseCard);
    });
}

// Função para filtrar cursos ao digitar no campo de pesquisa
function searchCourses() {
    const searchInput = document.getElementById('search').value.toLowerCase();

    // Filtrar cursos do usuário
    const filteredUserCourses = userCourses.filter(course => 
        course.nome.toLowerCase().includes(searchInput)
    );
    renderCourses(filteredUserCourses, document.getElementById('userCoursesGrid'), true);

    // Filtrar todos os cursos
    const filteredAllCourses = allCourses.filter(course => 
        course.nome.toLowerCase().includes(searchInput)
    );
    renderCourses(filteredAllCourses, document.getElementById('coursesGrid'), false);
}

// Função para redirecionar ao perfil do usuário
function goToProfile() {
    window.location.href = 'minhaPagina.html';
}
