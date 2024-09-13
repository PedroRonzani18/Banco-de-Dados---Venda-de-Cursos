document.addEventListener("DOMContentLoaded", async function() {
    const courseId = new URLSearchParams(window.location.search).get('courseId');
    const editCourseForm = document.getElementById('editCourseForm');
    const topicsContainer = document.getElementById('topicsContainer');

    const getCursoResponse = await fetch(`http://localhost:3000/curso/id/${courseId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const curso = await getCursoResponse.json();

    document.getElementById('courseName').value = curso.nome;
    document.getElementById('coursePrice').value = curso.preco;

    function renderTopics(topics) {
        topics.forEach((topic, index) => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic';
            topicDiv.innerHTML = `
                <h4>Tópico ${index + 1}</h4>
                <input type="text" value="${topic.nome}" class="topic-name" required>
                <button type="button" onclick="removeTopic(this)">Remover Tópico</button>
                <div class="lessons-container">
                    ${renderLessons(topic.aulas)}
                </div>
                <button type="button" onclick="addLesson(this)">Adicionar Aula</button>
            `;
            topicsContainer.appendChild(topicDiv);
        });
    }

    function renderLessons(lessons) {
        return lessons.map(lesson => `
            <div class="lesson">
                <h5>${lesson.nome}</h5>
                <!-- Campos adicionais de aula -->
                <button type="button" onclick="removeLesson(this)">Remover Aula</button>
            </div>
        `).join('');
    }

    window.addTopic = function() {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';
        topicDiv.innerHTML = `
            <h4>Nova Tópico</h4>
            <input type="text" placeholder="Nome do Tópico" class="topic-name" required>
            <button type="button" onclick="removeTopic(this)">Remover Tópico</button>
            <div class="lessons-container">
                <!-- Aulas serão adicionadas dinamicamente aqui -->
            </div>
            <button type="button" onclick="addLesson(this)">Adicionar Aula</button>
        `;
        topicsContainer.appendChild(topicDiv);
    };

    window.addLesson = function(button) {
        const lessonsContainer = button.previousElementSibling;
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'lesson';
        lessonDiv.innerHTML = `
            <h5>Nova Aula</h5>
            <input type="text" class="lesson-name" placeholder="Nome da Aula" required>
            <select class="lesson-type" onchange="updateLessonType(this)">
                <option value="text">Textual</option>
                <option value="video">Vídeo</option>
                <option value="activity">Atividade</option>
            </select>
            <div class="lesson-content-container">
                <textarea class="lesson-content" rows="3" placeholder="Conteúdo da Aula Textual"></textarea>
                <input type="text" class="lesson-url" placeholder="URL do Vídeo" style="display: none;">
                <div class="activity-container" style="display: none;">
                    <textarea class="lesson-question" rows="2" placeholder="Enunciado da Atividade"></textarea>
                    <div class="options-container">
                        <div class="lesson-option-container">
                            <input type="checkbox" class="lesson-option-correct"> <input type="text" class="lesson-option" placeholder="Opção 1">
                            <button type="button" onclick="removeOption(this)">Remover</button>
                        </div>
                        <button type="button" onclick="addOption(this)">Adicionar Opção</button>
                    </div>
                </div>
            </div>
            <button type="button" onclick="removeLesson(this)">Remover Aula</button>
        `;
        lessonsContainer.appendChild(lessonDiv);
    };

    window.updateLessonType = function(selectElement) {
        const lessonContainer = selectElement.parentElement;
        const textContent = lessonContainer.querySelector('.lesson-content');
        const videoUrl = lessonContainer.querySelector('.lesson-url');
        const activityContainer = lessonContainer.querySelector('.activity-container');

        textContent.style.display = selectElement.value === 'text' ? 'block' : 'none';
        videoUrl.style.display = selectElement.value === 'video' ? 'block' : 'none';
        activityContainer.style.display = selectElement.value === 'activity' ? 'block' : 'none';
    };

    window.removeTopic = function(button) {
        button.parentElement.remove();
    };

    window.removeLesson = function(button) {
        button.parentElement.remove();
    };

    window.addOption = function(button) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'lesson-option-container';
        optionDiv.innerHTML = `
            <input type="checkbox" class="lesson-option-correct"> <input type="text" class="lesson-option" placeholder="Nova Opção">
            <button type="button" onclick="removeOption(this)">Remover</button>
        `;
        button.parentElement.insertBefore(optionDiv, button);
    };

    window.removeOption = function(button) {
        button.parentElement.remove();
    };

    editCourseForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const updatedCourse = {
            nome: document.getElementById('courseName').value,
            preco: Number(document.getElementById('coursePrice').value),

        };

        const extraTopicos = Array.from(document.querySelectorAll('.topic')).map(topicDiv => {
            return {
                nome: topicDiv.querySelector('.topic-name').value,
                aulas: Array.from(topicDiv.querySelectorAll('.lesson')).map(lessonDiv => {

                    const type = lessonDiv.querySelector('.lesson-type').value;

                    if(type === 'text') {
                        return {
                            nome: lessonDiv.querySelector('.lesson-name').value,
                            tipo: type,
                            content: lessonDiv.querySelector('.lesson-content').value,
                        };
                    } else if(type === 'video') {
                        return {
                            nome: lessonDiv.querySelector('.lesson-name').value,
                            tipo: type,
                            url: lessonDiv.querySelector('.lesson-url').value,
                        };
                    } else if(type === 'activity') {
                        return {
                            nome: lessonDiv.querySelector('.lesson-name').value,
                            tipo: type,
                            question: lessonDiv.querySelector('.lesson-question').value,
                            options: Array.from(lessonDiv.querySelectorAll('.lesson-option-container')).map(optionDiv => {
                                return {
                                    option: optionDiv.querySelector('.lesson-option').value,
                                    correct: optionDiv.querySelector('.lesson-option-correct').checked,
                                };
                            })
                        };
                    }
                })
            };
        });

        for(const topic of extraTopicos) {

            const countTopicsFromCurso = await fetch(`http://localhost:3000/curso/count/topico/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const countTopics = await countTopicsFromCurso.json();

            const topicId = await fetch('http://localhost:3000/topico/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cursoId: Number(courseId),
                    index: countTopics + 1,
                    titulo: topic.nome,
                    descricao: '-'
                })
            });

            const createTopicoData = await topicId.json();
            const createdTopicoId = createTopicoData.id;

            if(!topicId.ok) alert('Erro ao adicionar tópico.');

            console.log("Aulas") 
            console.dir(topic.aulas, {depth: null});

            let indexAula = 0;
            for(const aula of topic.aulas) {

                if(aula.tipo === 'text') {

                    const result = await fetch('http://localhost:3000/aula/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            idTopico: Number(createdTopicoId),
                            titulo: aula.nome,
                            descricao: aula.content,
                            urlVideo: "-",
                            duracaoEstimada: 0,
                            index: Number(indexAula++)
                        })
                    });

                    if (!result.ok) {
                        alert('Erro ao criar aula.');
                        console.error('Erro ao criar aula:', result.statusText);
                        return;
                    }

                    console.log("Texto upado")
                } else if(aula.tipo === 'video') {

                    const result = await fetch('http://localhost:3000/aula/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            idTopico: Number(createdTopicoId),
                            titulo: aula.nome,
                            descricao: "-",
                            urlVideo: aula.url,
                            duracaoEstimada: 0,
                            index: Number(indexAula++)
                        })
                    });

                    if (!result.ok) {
                        alert('Erro ao criar aula.');
                        console.error('Erro ao criar aula:', result.statusText);
                        return;
                    }

                    console.log("Video upado")
                } else if(aula.tipo === 'activity') {

                    const result = await fetch('http://localhost:3000/aula/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            idTopico: Number(createdTopicoId),
                            titulo: aula.nome,
                            descricao: "-",
                            urlVideo: "-",
                            duracaoEstimada: 0,
                            index: Number(indexAula++)
                        })
                    });

                    if (!result.ok) {
                        alert('Erro ao criar aula.');
                        console.error('Erro ao criar aula:', result.statusText);
                        return;
                    }

                    const resultData = await result.json();
                    const createdAulaId = resultData.id;

                    const createAtividadeResponse = await fetch('http://localhost:3000/atividade/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            idAula: Number(createdAulaId),
                            enunciado: aula.question,
                            titulo: aula.nome,
                        })
                    });

                    if (!createAtividadeResponse.ok) {
                        alert('Erro ao criar atividade.');
                        console.error('Erro ao criar atividade:', createAtividadeResponse.statusText);
                        return;
                    }

                    const createAtividadeData = await createAtividadeResponse.json();
                    const createdAtividadeId = createAtividadeData.id;

                    let indexAlternativa = 0;
                    for(const option of aula.options) {

                        const createOpcaoResponse = await fetch('http://localhost:3000/alternativa/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                idAtividade: Number(createdAtividadeId),
                                numAtividade: Number(indexAlternativa++), 
                                certa: option.correct,
                                descricao: option.option
                            })
                        });

                        if (!createOpcaoResponse.ok) {
                            alert('Erro ao criar opção.');
                            console.error('Erro ao criar opção:', createOpcaoResponse.statusText);
                            return;
                        }
                    }
                }
            }
        }
        
        const updateCursoResponse = await fetch(`http://localhost:3000/curso/${courseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCourse)
        });

        if(updateCursoResponse.ok) {
            alert('Curso atualizado com sucesso!');
            // window.location.href = 'minhaPagina.html';
        } else {
            alert('Erro ao atualizar o curso.');
        }

        // fetch(`http://localhost:3000/curso/${courseId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(updatedCourse)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         alert('Curso atualizado com sucesso!');
        //         window.location.href = 'minhaPagina.html';
        //     } else {
        //         alert('Erro ao atualizar o curso.');
        //     }
        // })
        // .catch(error => {
        //     console.error('Erro ao atualizar curso:', error);
        //     alert('Erro ao se conectar com o servidor.');
        // });
    });
});
