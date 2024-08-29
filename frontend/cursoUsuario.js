document.addEventListener("DOMContentLoaded", function() {
    const courseId = 1; // Exemplo: ID do curso do usuário
    let lessons = [
        { id: 1, topic: "Tópico 1", title: "Introdução ao Curso", description: "Primeiros passos e objetivos", videoUrl: "https://www.youtube.com/embed/example1", viewed: true },
        { id: 2, topic: "Tópico 1", title: "Fundamentos Básicos", description: "Conceitos principais", videoUrl: "https://www.youtube.com/embed/example2", viewed: true },
        { id: 3, topic: "Tópico 2", title: "Aula Intermediária", description: "Aprofundando os conhecimentos", videoUrl: "https://www.youtube.com/embed/example3", viewed: false },
        { id: 4, topic: "Tópico 2", title: "Aula Avançada", description: "Tópicos avançados", videoUrl: "https://www.youtube.com/embed/example4", viewed: false },
    ];

    // Exibir dados fictícios para testar a disposição
    renderLessonData(lessons);

    function renderLessonData(lessons) {
        // Encontrar a próxima aula não assistida
        const nextLesson = lessons.find(lesson => !lesson.viewed);
        
        if (nextLesson) {
            document.getElementById('lessonTopic').textContent = nextLesson.topic;
            document.getElementById('lessonTitle').textContent = nextLesson.title;
            document.getElementById('lessonDescription').textContent = nextLesson.description;
            document.getElementById('lessonVideo').src = nextLesson.videoUrl;
        }

        // Renderizar a lista de progresso das aulas
        const lessonList = document.getElementById('lessonList');
        lessonList.innerHTML = ''; // Limpar a lista antes de renderizar

        lessons.forEach(lesson => {
            const listItem = document.createElement('li');
            listItem.textContent = `${lesson.title} (${lesson.topic})` + (lesson.viewed ? " ✔️" : " ❌");
            listItem.classList.add(lesson.viewed ? 'viewed' : '');
            lessonList.appendChild(listItem);
        });
    }

    window.goToActivity = function() {
        window.location.href = `atividade.html?id=${courseId}`; // Página de atividade da aula atual (implementação futura)
    };

    window.goToNextLesson = function() {
        // Marcar a aula atual como vista e ir para a próxima
        const nextLessonIndex = lessons.findIndex(lesson => !lesson.viewed);
        if (nextLessonIndex !== -1) {
            lessons[nextLessonIndex].viewed = true; // Marca a aula como vista
            renderLessonData(lessons); // Re-renderizar a lista com a atualização
        }
    };
});
