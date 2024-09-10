document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('courseForm');
    const topicsContainer = document.getElementById('topicsContainer');
    let topicCount = 0;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const coursePrice = document.getElementById('coursePrice').value;

        // Verificar se o preço é positivo
        if (coursePrice < 0) {
            alert('O preço não pode ser negativo.');
            return;
        }

        const courseData = {
            nome: document.getElementById('courseName').value,
            descricao: document.getElementById('courseDescription').value,
            imagem: document.getElementById('courseImage').value,
            preco: parseInt(coursePrice),
            cargaHora: parseInt(document.getElementById('courseHours').value),
            usuarioId: 28
            // teachers: document.getElementById('courseTeachers').value,
            // topics: []
        };

        console.dir({teachers: document.getElementById('courseTeachers').value}, {depth: null});

        const topics = []

        for (let i = 0; i < topicCount; i++) {
            const topicName = document.getElementById(`topicName_${i}`);
            const topicDescription = document.getElementById(`topicDescription_${i}`);
            const topicLessons = document.getElementById(`topicLessons_${i}`);

            if (topicName && topicDescription && topicLessons) {
                topics.push({
                    name: topicName.value,
                    description: topicDescription.value,
                    lessons: topicLessons.value.split("\n").filter(link => link.trim() !== '')
                });
            }
        }

        const response = await fetch('http://localhost:3000/curso/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Curso lançado com sucesso!');
            // window.location.href = 'minhaPagina.html';
        } else {
            alert('Erro ao lançar curso.');
            return;
        }

        console.dir({data}, {depth: null});


        let counter = 0;
        for(const topic of topics) {
            const topicData = {
                titulo: topic.name,
                descricao: topic.description,
                // aulas: topic.lessons,
                cursoId: data.id,
                index: counter++
            };

            console.dir({topicData}, {depth: null});

            const response = await fetch('http://localhost:3000/topico/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(topicData)
            });

            if (!response.ok) {
                alert('Erro ao lançar tópico');
                console.error('Erro ao lançar tópico:', response);
                return;
            }

            alert('Topicos Lançados com sucesso!');
            window.location.href = 'minhaPagina.html';

        }


        // Enviar os dados do curso ao backend
        // fetch('http://localhost:3000/courses', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(courseData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         alert('Curso lançado com sucesso!');
        //         window.location.href = 'minhaPagina.html';
        //     } else {
        //         alert('Erro ao lançar curso.');
        //     }
        // })
        // .catch(error => {
        //     console.error('Erro ao lançar curso:', error);
        //     alert('Erro ao se conectar com o servidor.');
        // });
    });

    window.addTopic = function () {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';
        topicDiv.id = `topic_${topicCount}`;

        topicDiv.innerHTML = `
            <h4 id="topicTitle_${topicCount}">Tópico ${topicCount + 1}</h4>
            <input type="text" id="topicName_${topicCount}" placeholder="Nome do Tópico" required>
            <textarea id="topicDescription_${topicCount}" rows="3" placeholder="Descrição do Tópico" required></textarea>
            <textarea id="topicLessons_${topicCount}" rows="4" placeholder="Links das Aulas (um por linha)" required></textarea>
            <button type="button" class="remove-topic" onclick="removeTopic(${topicCount})">&times;</button>
        `;

        topicsContainer.appendChild(topicDiv);
        topicCount++;
    };

    window.removeTopic = function (topicIndex) {
        const topicDiv = document.getElementById(`topic_${topicIndex}`);
        topicsContainer.removeChild(topicDiv);
        reindexTopics();
    };

    function reindexTopics() {
        const topics = topicsContainer.getElementsByClassName('topic');
        topicCount = 0;
        Array.from(topics).forEach((topicDiv, index) => {
            const oldIndex = topicDiv.id.split('_')[1];
            topicDiv.id = `topic_${index}`;
            topicDiv.querySelector('h4').textContent = `Tópico ${index + 1}`;
            topicDiv.querySelector('.remove-topic').setAttribute('onclick', `removeTopic(${index})`);

            const nameInput = topicDiv.querySelector(`#topicName_${oldIndex}`);
            nameInput.id = `topicName_${index}`;
            const descTextarea = topicDiv.querySelector(`#topicDescription_${oldIndex}`);
            descTextarea.id = `topicDescription_${index}`;
            const lessonsTextarea = topicDiv.querySelector(`#topicLessons_${oldIndex}`);
            lessonsTextarea.id = `topicLessons_${index}`;

            topicCount++;
        });
    }
});
