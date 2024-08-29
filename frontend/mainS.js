document.addEventListener("DOMContentLoaded", function() {
    let courses = [];

    // Carregar cursos do backend
    fetch('http://localhost:3000/courses')  // <--- URL do backend para buscar os cursos
        .then(response => response.json())
        .then(data => {
            courses = data;
            renderCourses(courses);
        })
        .catch(error => {
            console.error('Erro ao carregar cursos:', error);
        });

    function renderCourses(courses) {
        const grid = document.getElementById('coursesGrid');
        grid.innerHTML = ''; // Limpar o grid antes de renderizar
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.name}">
                <h3>${course.name}</h3>
                <p><strong>Carga Horária:</strong> ${course.hours}</p>
                <p><strong>Tema:</strong> ${course.theme}</p>
                <p><strong>Professores:</strong> ${course.teachers}</p>
            `;
            courseCard.addEventListener('click', () => {
                checkUserCourse(course.id);
            });
            grid.appendChild(courseCard);
        });
    }

    function checkUserCourse(courseId) {
        fetch(`http://localhost:3000/user/hasCourse/${courseId}`)
            .then(response => response.json())
            .then(data => {
                if (data.hasCourse) {
                    window.location.href = `cursoUsuario.html?id=${courseId}`; // Página para cursos que o usuário possui (implementação futura)
                } else {
                    window.location.href = `cursoDescricao.html?id=${courseId}`; // Página de descrição do curso
                }
            })
            .catch(error => {
                console.error('Erro ao verificar curso do usuário:', error);
            });
    }

    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.name.toLowerCase().includes(searchTerm)
        );
        renderCourses(filteredCourses);
    });

    document.getElementById('filterInput').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const dropdown = document.getElementById('themeDropdown');
        dropdown.innerHTML = ''; // Limpar as opções
        dropdown.classList.remove('show');
        const filteredThemes = [...new Set(courses.map(course => course.theme))]
            .filter(theme => theme.toLowerCase().includes(searchTerm));
        
        if (filteredThemes.length > 0) {
            filteredThemes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme;
                option.textContent = theme;
                option.addEventListener('click', () => {
                    this.value = theme;
                    dropdown.classList.remove('show');
                    const filteredCourses = courses.filter(course => course.theme.toLowerCase() === theme.toLowerCase());
                    renderCourses(filteredCourses);
                });
                dropdown.appendChild(option);
            });
            dropdown.classList.add('show');
        } else {
            dropdown.classList.remove('show');
        }
    });


});

function goToProfile() {
    window.location.href = 'minhaPagina.html';
}
