document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId'); 
    const userCoursesGrid = document.getElementById('userCoursesGrid');
    const coursesGrid = document.getElementById('coursesGrid');

    try {
        // Buscar cursos que o usuário está fazendo
        const userCoursesResponse = await fetch(`http://localhost:3000/curso/list/user/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        let userCourses = [];

        if (userCoursesResponse.ok) {
            userCourses = await userCoursesResponse.json();

            renderCourses(userCourses, userCoursesGrid);
        } else {
            console.error('Erro ao buscar cursos do usuário:', userCoursesResponse.statusText);
        }

        // Buscar todos os cursos disponíveis
        const allCoursesResponse = await fetch('http://localhost:3000/curso/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (allCoursesResponse.ok) {
            const allCourses = await allCoursesResponse.json();

            const allCoursesMinusUserCourses = allCourses.filter(course => !userCourses.some(userCourse => userCourse.id === course.id));

            console.dir(allCoursesMinusUserCourses, { depth: null });
            renderCourses(allCoursesMinusUserCourses, coursesGrid);
        } else {
            console.error('Erro ao buscar todos os cursos:', allCoursesResponse.statusText);
        }
    } catch (error) {
        console.error('Erro na conexão com o servidor:', error);
    }
});

// Função para renderizar os cursos em um grid
function renderCourses(courses, gridElement) {
    gridElement.innerHTML = ''; // Limpar o grid antes de renderizar
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <img src="${course.imagem}" alt="${course.nome}">
            <h3>${course.nome}</h3>
            <p><strong>Carga Horária:</strong> ${course.cargaHora}</p>
            <p><strong>Tema:</strong> ${course.tema}</p>
        `;
        courseCard.addEventListener('click', () => {
            window.location.href = `curso.html?id=${course.id}`;
        });
        gridElement.appendChild(courseCard);
    });
}

// Função para redirecionar ao perfil do usuário
function goToProfile() {
    window.location.href = 'minhaPagina.html';
}
