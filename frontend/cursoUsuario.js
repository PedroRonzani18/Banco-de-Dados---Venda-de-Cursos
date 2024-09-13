document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('userId');
    const courseId = new URLSearchParams(window.location.search).get('id');
    let currentLessonIndex = 0;
    let currentTopicIndex = 0;
    let courseData = {};
    let topicsGlobal = [];
    let aulasGlobal = [];

    // Função para carregar dados do curso
    async function loadCourseData() {
        try {
            const courseResponse = await fetch(`http://localhost:3000/curso/id/${courseId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!courseResponse.ok) throw new Error('Erro ao buscar dados do curso');

            courseData = await courseResponse.json();

            const topicosResponse = await fetch(`http://localhost:3000/topico/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!topicosResponse.ok) throw new Error('Erro ao buscar tópicos do curso');

            const topicosData = await topicosResponse.json();
            topicsGlobal = topicosData.filter(topico => topico.cursoId === Number(courseId));

            const aulasResponse = await fetch(`http://localhost:3000/aula/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!aulasResponse.ok) throw new Error('Erro ao buscar aulas');

            const aulasData = await aulasResponse.json();
            aulasGlobal = aulasData;

            topicsGlobal.forEach(topic => {
                topic.aulas = aulasGlobal.filter(aula => aula.idTopico === topic.id);
            });

            renderCourseProgress(topicsGlobal);
            loadLesson(currentTopicIndex, currentLessonIndex);
        } catch (error) {
            console.error('Erro ao buscar dados do curso:', error);
        }
    }

    // Função para renderizar o progresso das aulas
    function renderCourseProgress(topics) {
        const lessonList = document.getElementById('lessonList');
        lessonList.innerHTML = '';

        topics.forEach((topic, topicIndex) => {
            const topicElement = document.createElement('h4');
            topicElement.textContent = topic.titulo;
            lessonList.appendChild(topicElement);

            topic.aulas.forEach((lesson, lessonIndex) => {
                const lessonItem = document.createElement('li');
                lessonItem.textContent = `${lesson.titulo}`;
                lessonItem.className = lesson.assistida ? 'completed' : '';

                lessonItem.addEventListener('click', () => {
                    currentTopicIndex = topicIndex;
                    currentLessonIndex = lessonIndex;
                    loadLesson(currentTopicIndex, currentLessonIndex);
                });

                lessonList.appendChild(lessonItem);
            });
        });
    }

    // Função para carregar a aula atual
    async function loadLesson(topicIndex, lessonIndex) {
        const topic = topicsGlobal[topicIndex];
        const lesson = topic.aulas[lessonIndex];

        console.log("Lesson")
        console.dir({lesson});

        document.getElementById('lessonTopic').textContent = topic.titulo;
        document.getElementById('lessonTitle').textContent = lesson.titulo;

        if (lesson.descricao !== '-') {
            document.getElementById('lessonDescription').textContent = lesson.descricao || 'Conteúdo não disponível';
            document.querySelector('.video-container').style.display = 'none';
        } else if (lesson.urlVideo !== '-') {
            console.log("url: " + lesson.urlVideo);
            document.getElementById('lessonVideo').src = lesson.urlVideo || '';
            document.getElementById('lessonDescription').textContent = '';
            document.querySelector('.video-container').style.display = 'block';
        } else {
            document.getElementById('lessonDescription').textContent = lesson.pergunta || 'Pergunta não disponível';
            document.querySelector('.video-container').style.display = 'none';

            const atividadesResponse = await fetch(`http://localhost:3000/atividade/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const atividadesData = await atividadesResponse.json();

            const atividade = atividadesData.find(atividade => atividade.idAula === lesson.id);

            console.log("Atividade")
            console.dir({atividade});

            const opcoesResponse = await fetch(`http://localhost:3000/alternativa/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const opcoesData = await opcoesResponse.json();
            console.log("OptionsData")
            console.dir({options: opcoesData});
            lesson.options = opcoesData.filter(opcao => opcao.idAtividade === atividade.id);

            console.log("Options")
            console.dir({options: lesson.options});

            renderActivityOptions(lesson.options);
        }
    }

    function renderActivityOptions(options) {
        const activityContainer = document.getElementById('lessonDescription');
        activityContainer.innerHTML = '';

        options.forEach(option => {
            const optionElement = document.createElement('button');
            optionElement.textContent = option.descricao;
            optionElement.onclick = function () {
                checkActivityAnswer(option.certa);
            };
            activityContainer.appendChild(optionElement);
        });
    }

    function checkActivityAnswer(isCorrect) {
        if (isCorrect) {
            alert('Correto!');
        } else {
            alert('Incorreto. Tente novamente.');
        }
    }

    window.goToNextLesson = async function () {
        const topic = topicsGlobal[currentTopicIndex];
        const lesson = topic.aulas[currentLessonIndex];

        await markLessonAsWatched(lesson.id);

        if (currentLessonIndex < topic.aulas.length - 1) {
            currentLessonIndex++;
        } else if (currentTopicIndex < topicsGlobal.length - 1) {
            currentTopicIndex++;
            currentLessonIndex = 0;
        } else {
            alert('Você completou todas as aulas deste curso!');
            window.location.href = 'mainS.html';
            return;
        }

        loadLesson(currentTopicIndex, currentLessonIndex);
        renderCourseProgress(topicsGlobal);
    };

    async function markLessonAsWatched(lessonId) {
        await fetch('http://localhost:3000/aula-assistida/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                idUsuario: Number(userId), 
                idAula: Number(lessonId) 
            })
        });
    }

    loadCourseData();
});
