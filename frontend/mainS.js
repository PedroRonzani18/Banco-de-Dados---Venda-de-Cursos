document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId');
    const userCoursesGrid = document.getElementById('userCoursesGrid');
    const coursesGrid = document.getElementById('coursesGrid');

    // Buscar cursos que o usuário está matriculado (inscrito)
    const userCoursesResponse = await fetch(`http://localhost:3000/curso/list/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    let userCourses = [];

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
        const allCourses = await allCoursesResponse.json();
        const allCoursesMinusUserCourses = allCourses.filter(course => !userCourses.some(userCourse => userCourse.id === course.id));

        console.dir(allCoursesMinusUserCourses, { depth: null });
        renderCourses(allCoursesMinusUserCourses, coursesGrid, false); // Passa 'false' para indicar cursos não pertencentes ao usuário
    } else {
        console.error('Erro ao buscar todos os cursos:', allCoursesResponse.statusText);
    }
});

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

// Função para redirecionar ao perfil do usuário
function goToProfile() {
    window.location.href = 'minhaPagina.html';
}