document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId');
    const certificatesGrid = document.getElementById('certificatesGrid');

    // Função para buscar cursos do usuário e verificar se concluíram
    async function loadCompletedCourses() {
        try {
            // Buscar cursos do usuário
            const coursesResponse = await fetch(`http://localhost:3000/curso/list/user/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!coursesResponse.ok) {
                throw new Error('Erro ao buscar cursos do usuário');
            }

            const courses = await coursesResponse.json();
            const completedCourses = [];

            // Verificar se o usuário concluiu cada curso
            for (const course of courses) {
                const aulasResponse = await fetch(`http://localhost:3000/aula/`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const aulas = await aulasResponse.json();
                const aulasDoCurso = aulas.filter(aula => aula.cursoId === course.id);
                
                if (aulasDoCurso.length > 0) {
                    const ultimaAula = aulasDoCurso[aulasDoCurso.length - 1];

                    // Verificar se a última aula foi assistida
                    const aulaAssistidaResponse = await fetch(`http://localhost:3000/aula-assistida/titulo/`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idAula: Number(ultimaAula.id), idUsuario: Number(userId) })
                    });

                    const aulaAssistidaData = await aulaAssistidaResponse.json();
                    if (aulaAssistidaData.assistida) {
                        completedCourses.push(course);
                    }
                }
            }

            renderCertificates(completedCourses);
        } catch (error) {
            console.error('Erro ao buscar dados do backend:', error);
        }
    }

    // Função para renderizar os certificados
    function renderCertificates(courses) {
        certificatesGrid.innerHTML = ''; // Limpar o grid antes de renderizar
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'certificate-card';
            courseCard.innerHTML = `
                <h3>${course.nome}</h3>
                <p>Carga Horária: ${course.cargaHoraria} horas</p>
                <button onclick="emitirCertificado('${course.nome}', ${course.cargaHoraria})">Emitir Certificado</button>
            `;
            certificatesGrid.appendChild(courseCard);
        });
    }

    // Função para emitir certificado
    window.emitirCertificado = function (courseName, cargaHoraria) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Certificado de Conclusão', 20, 30);
        doc.setFontSize(16);
        doc.text(`Certificamos que o aluno concluiu o curso:`, 20, 50);
        doc.setFontSize(14);
        doc.text(`${courseName}`, 20, 60);
        doc.text(`Com carga horária de: ${cargaHoraria} horas`, 20, 70);
        doc.text(`Emitido em: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 80);
        doc.text(`Plataforma: EduMaster`, 20, 90);
        doc.save(`Certificado_${courseName}.pdf`);
    };

    loadCompletedCourses();
});
