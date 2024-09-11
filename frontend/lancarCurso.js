document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('courseForm');
    const topicsContainer = document.getElementById('topicsContainer');
    let topicCount = 0;

    form.addEventListener('submit', function(event) {
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

        for (let i = 0; i < topicCount; i++) {
            const topicName = document.getElementById(`topicName_${i}`).value;
            const topicTheme = document.getElementById(`topicTheme_${i}`).value;
            const topicProfessor = document.getElementById(`topicProfessor_${i}`).value;
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
                theme: topicTheme,
                professor: topicProfessor,
                lessons: lessons
            });
        }

        // Enviar os dados do curso ao backend
        fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Curso lançado com sucesso!');
                window.location.href = 'minhaPagina.html';
            } else {
                alert('Erro ao lançar curso.');
            }
        })
        .catch(error => {
            console.error('Erro ao lançar curso:', error);
            alert('Erro ao se conectar com o servidor.');
        });
    });

    window.addTopic = function() {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';
        topicDiv.id = `topic_${topicCount}`;

        topicDiv.innerHTML = `
            <h4>Tópico ${topicCount + 1}</h4>
            <input type="text" id="topicName_${topicCount}" placeholder="Nome do Tópico" required>
            <input type="text" id="topicTheme_${topicCount}" placeholder="Tema do Tópico" required>
            <input type="text" id="topicProfessor_${topicCount}" placeholder="Professor do Tópico" required>
            <div class="lessons-container" id="lessonsContainer_${topicCount}">
                <!-- Aulas serão adicionadas dinamicamente aqui -->
            </div>
            <button type="button" onclick="addLesson(${topicCount})">Adicionar Aula</button>
            <button type="button" class="remove-topic" onclick="removeTopic(${topicCount})">&times;</button>
        `;

        topicsContainer.appendChild(topicDiv);
        topicCount++;
    };

    window.addLesson = function(topicIndex) {
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
                        <div class="lesson-option-container">
                            <input type="checkbox" class="lesson-option-correct"> <input type="text" class="lesson-option" placeholder="Opção 2">
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

    window.removeTopic = function(topicIndex) {
        const topicDiv = document.getElementById(`topic_${topicIndex}`);
        topicsContainer.removeChild(topicDiv);
        reindexTopics();
    };

    window.removeLesson = function(button) {
        const lessonDiv = button.parentElement;
        lessonDiv.parentElement.removeChild(lessonDiv);
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
        const optionDiv = button.parentElement;
        optionDiv.remove();
    };

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
