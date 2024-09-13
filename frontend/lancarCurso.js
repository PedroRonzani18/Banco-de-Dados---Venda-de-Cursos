document.addEventListener("DOMContentLoaded", function () {
    // Recupera o ID do usuário do Local Storage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('Usuário não autenticado. Faça login novamente.');
        window.location.href = 'login.html'; // Redireciona para a página de login
        return;
    }
    // Agora você pode usar o userId em suas requisições ou lógica
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('courseForm');
    const topicsContainer = document.getElementById('topicsContainer');
    let topicCount = 0;
    let professors = [];
    let themes = [];

    // Buscar temas e professores do backend
    async function fetchData() {
        try {
            const responseProfessors = await fetch('http://localhost:3000/professor/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (responseProfessors.ok) {
                professors = await responseProfessors.json();
                console.dir({professors}, { depth: null });
            } else {
                console.error('Erro ao buscar professores:', responseProfessors.statusText);
            }

            const responseThemes = await fetch('http://localhost:3000/tema/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (responseThemes.ok) {
                themes = await responseThemes.json();
                console.dir({themes}, { depth: null });
            } else {
                console.error('Erro ao buscar temas:', responseThemes.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar temas e professores:', error);
        }
    }

    fetchData();

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const coursePrice = document.getElementById('coursePrice').value;

        // Verificar se o preço é positivo
        if (coursePrice < 0) {
            alert('O preço não pode ser negativo.');
            return;
        }

        const courseData = {
            name: document.getElementById('courseName').value,
            description: document.getElementById('courseDescription').value,
            image: document.getElementById('courseImage').value,
            price: coursePrice,
            hours: document.getElementById('courseHours').value,
            topics: []
        };

        // Coletar dados dos tópicos
        for (let i = 0; i < topicCount; i++) {
            const topicName = document.getElementById(`topicName_${i}`).value;
            const selectedThemes = Array.from(document.querySelectorAll(`#themeInputs_${i} select`)).map(select => select.value);
            const selectedProfessors = Array.from(document.querySelectorAll(`#professorInputs_${i} select`)).map(select => select.value);
            const lessons = [];
            const lessonElements = document.querySelectorAll(`#topic_${i} .lesson`);

            lessonElements.forEach(lessonElement => {
                const lessonType = lessonElement.querySelector('.lesson-type').value;
                const lessonName = lessonElement.querySelector('.lesson-name').value;

                if (lessonType === 'text') {
                    lessons.push({
                        type: 'text',
                        name: lessonName,
                        content: lessonElement.querySelector('.lesson-content').value
                    });
                } else if (lessonType === 'video') {
                    lessons.push({
                        type: 'video',
                        name: lessonName,
                        url: lessonElement.querySelector('.lesson-url').value
                    });
                } else if (lessonType === 'activity') {
                    const question = lessonElement.querySelector('.lesson-question').value;
                    const options = [];
                    lessonElement.querySelectorAll('.lesson-option-container').forEach(optionContainer => {
                        options.push({
                            option: optionContainer.querySelector('.lesson-option').value,
                            correct: optionContainer.querySelector('.lesson-option-correct').checked
                        });
                    });
                    lessons.push({
                        type: 'activity',
                        name: lessonName,
                        question: question,
                        options: options
                    });
                }
            });

            courseData.topics.push({
                name: topicName,
                themes: selectedThemes,
                professors: selectedProfessors,
                lessons: lessons
            });
        }

        const createCursoResponse = await fetch('http://localhost:3000/curso/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuarioId: Number(localStorage.getItem('userId')),
                nome: courseData.name,
                imagem: courseData.image,
                descricao: courseData.description,
                cargaHora: Number(courseData.hours),
                preco: Number(courseData.price),
            })
        });

        if(!createCursoResponse.ok) {
            alert('Erro ao criar curso.');
            console.error('Erro ao criar curso:', createCursoResponse.statusText);
            return;
        }

        const createCursoData = await createCursoResponse.json();

        const createdCursoId = createCursoData.id; 

        console.log("Curso criado com sucesso. ID: ", createdCursoId);

        let indexTopico = 0;
        for(const topico of courseData.topics) {
        
            console.dir("Professores");
            console.dir(topico.professors, { depth: null });
            console.dir("Themas", themes, { depth: null });
            console.dir(topico.themes, { depth: null });
            console.dir("Aulas", topico.lessons, { depth: null });
            console.dir(topico.lessons, { depth: null });

            console.dir("Data: ")
            console.dir({
                titulo: topico.name,
                cursoId: Number(createdCursoId),
                descricao: '-',
                index: Number(indexTopico++)
            })

            const createTopicoResponse = await fetch('http://localhost:3000/topico/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: topico.name,
                    cursoId: Number(createdCursoId),
                    descricao: '-',
                    index: Number(indexTopico++)
                })
            });

            if (!createTopicoResponse.ok) {
                alert('Erro ao criar tópico.');
                console.error('Erro ao criar tópico:', createTopicoResponse.statusText);
                return;
            }

            const createTopicoData = await createTopicoResponse.json();
            const createdTopicoId = createTopicoData.id;

            for(const professor of topico.professors) {

                const professorAlvo = professors.find(prof => prof.nome === professor);

                console.log("Professor Alvo");
                console.dir({professorAlvo})

                console.log("Professores");
                console.dir(professors, { depth: null });

                console.log("Professor");
                console.dir(professor, { depth: null });
                
                console.log("createdTopicoId")
                console.dir(createdTopicoId, { depth: null });

                const createProfessorTopicoResponse = await fetch('http://localhost:3000/topico-professor/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        idProfessor: Number(professorAlvo.id),
                        idTopico: Number(createdTopicoId)
                    })
                });

                if (!createProfessorTopicoResponse.ok) {
                    alert('Erro ao criar professorTopico.');
                    console.error('Erro ao criar professorTopico:', createProfessorTopicoResponse.statusText);
                    return;
                }
            }

            for(const tema of topico.themes) {

                const temaAlvo = themes.find(thm => thm.nome === tema);

                const createTemaTopicoResponse = await fetch('http://localhost:3000/topico-tema/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        idTema: Number(temaAlvo.id),
                        idTopico: Number(createdTopicoId)
                    })
                });

                if (!createTemaTopicoResponse.ok) {
                    alert('Erro ao criar temaTopico.');
                    console.error('Erro ao criar temaTopico:', createTemaTopicoResponse.statusText);
                    return;
                }
            }
        }

    });

    // Função para adicionar um novo tópico
    window.addTopic = function () {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';
        topicDiv.id = `topic_${topicCount}`;

        topicDiv.innerHTML = `
            <h4>Tópico ${topicCount + 1}</h4>
            <input type="text" id="topicName_${topicCount}" placeholder="Nome do Tópico" required>
            <div class="themes-container">
                <label for="themes">Temas:</label>
                <div id="themeInputs_${topicCount}">
                    <!-- Campos de tema serão adicionados aqui -->
                </div>
                <button type="button" onclick="addTheme(${topicCount})">Adicionar Tema</button>
            </div>
            <div class="professors-container">
                <label for="professores">Professores:</label>
                <div id="professorInputs_${topicCount}">
                    <!-- Campos de professor serão adicionados aqui -->
                </div>
                <button type="button" onclick="addProfessor(${topicCount})">Adicionar Professor</button>
            </div>
            <div class="lessons-container" id="lessonsContainer_${topicCount}">
                <!-- Aulas serão adicionadas dinamicamente aqui -->
            </div>
            <button type="button" onclick="addLesson(${topicCount})">Adicionar Aula</button>
            <button type="button" class="remove-topic" onclick="removeTopic(${topicCount})">&times;</button>
        `;

        topicsContainer.appendChild(topicDiv);
        topicCount++;

        addTheme(topicCount - 1); // Adicionar o primeiro campo de tema
        addProfessor(topicCount - 1); // Adicionar o primeiro campo de professor
    };

    // Função para remover um tópico
    window.removeTopic = function (topicIndex) {
        const topicDiv = document.getElementById(`topic_${topicIndex}`);
        if (topicDiv) {
            topicsContainer.removeChild(topicDiv);
            reindexTopics();
        }
    };

    // Função para adicionar um novo dropdown de tema
    window.addTheme = function (topicIndex) {
        const themeContainer = document.getElementById(`themeInputs_${topicIndex}`);
        const themeDiv = document.createElement('div');
        themeDiv.className = 'theme-input';

        themeDiv.innerHTML = `
            <input type="text" id="themeFilter_${topicIndex}" placeholder="Digite para filtrar temas..." onkeyup="filterThemes(${topicIndex}, this)">
            <select id="themeSelect_${topicIndex}" size="4" style="width: 100%; margin-top: 5px;">
                ${themes.map(theme => `<option value="${theme.nome}">${theme.nome}</option>`).join('')}
            </select>
            <button type="button" onclick="removeInput(this)">Remover Tema</button>
        `;

        themeContainer.appendChild(themeDiv);
    };

    // Função para adicionar um novo dropdown de professor
    window.addProfessor = function (topicIndex) {
        const professorContainer = document.getElementById(`professorInputs_${topicIndex}`);
        const professorDiv = document.createElement('div');
        professorDiv.className = 'professor-input';

        professorDiv.innerHTML = `
            <input type="text" id="professorFilter_${topicIndex}" placeholder="Digite para filtrar professores..." onkeyup="filterProfessors(${topicIndex}, this)">
            <select id="professorSelect_${topicIndex}" size="4" style="width: 100%; margin-top: 5px;">
                ${professors.map(prof => `<option value="${prof.nome}">${prof.nome}</option>`).join('')}
            </select>
            <button type="button" onclick="removeInput(this)">Remover Professor</button>
        `;

        professorContainer.appendChild(professorDiv);
    };

    // Função para remover um campo de tema ou professor
    window.removeInput = function (button) {
        button.parentElement.remove();
    };

    // Função para filtrar temas no dropdown
    window.filterThemes = function (topicIndex, input) {
        const filterText = input.value.toLowerCase();
        const selectElement = input.nextElementSibling;
        Array.from(selectElement.options).forEach(option => {
            option.style.display = option.value.toLowerCase().includes(filterText) ? '' : 'none';
        });
    };

    // Função para filtrar professores no dropdown
    window.filterProfessors = function (topicIndex, input) {
        const filterText = input.value.toLowerCase();
        const selectElement = input.nextElementSibling;
        Array.from(selectElement.options).forEach(option => {
            option.style.display = option.value.toLowerCase().includes(filterText) ? '' : 'none';
        });
    };

    // Função para adicionar uma nova aula ao tópico
    window.addLesson = function (topicIndex) {
        const lessonsContainer = document.getElementById(`lessonsContainer_${topicIndex}`);
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
                    <div>
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

    // Função para atualizar o tipo de aula
    window.updateLessonType = function (selectElement) {
        const lessonContainer = selectElement.parentElement;
        const textContent = lessonContainer.querySelector('.lesson-content');
        const videoUrl = lessonContainer.querySelector('.lesson-url');
        const activityContainer = lessonContainer.querySelector('.activity-container');

        textContent.style.display = selectElement.value === 'text' ? 'block' : 'none';
        videoUrl.style.display = selectElement.value === 'video' ? 'block' : 'none';
        activityContainer.style.display = selectElement.value === 'activity' ? 'block' : 'none';
    };

    // Função para remover aula
    window.removeLesson = function (button) {
        const lessonDiv = button.parentElement;
        lessonDiv.remove();
    };

    // Função para adicionar uma nova opção na atividade
    window.addOption = function (button) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'lesson-option-container';
        optionDiv.innerHTML = `
            <input type="checkbox" class="lesson-option-correct"> <input type="text" class="lesson-option" placeholder="Nova Opção">
            <button type="button" onclick="removeOption(this)">Remover</button>
        `;
        button.parentElement.insertBefore(optionDiv, button);
    };

    // Função para remover opção
    window.removeOption = function (button) {
        button.parentElement.remove();
    };

    // Função para reindexar tópicos após a remoção
    function reindexTopics() {
        const topics = topicsContainer.getElementsByClassName('topic');
        topicCount = 0;
        Array.from(topics).forEach((topicDiv, index) => {
            topicDiv.id = `topic_${index}`;
            topicDiv.querySelector('h4').textContent = `Tópico ${index + 1}`;
            topicDiv.querySelector('.remove-topic').setAttribute('onclick', `removeTopic(${index})`);
            topicCount++;
        });
    }
});