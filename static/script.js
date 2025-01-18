let currentQuestionIndex = 0;  // Para llevar el control de la pregunta actual
let questions = [];  // Para almacenar las preguntas

// Función para cargar preguntas desde el servidor
async function loadQuestions() {
    const response = await fetch('/get_questions');
    const data = await response.json();
    questions = data.data;  // Guardamos las preguntas
    showQuestion(currentQuestionIndex);  // Mostrar la primera pregunta
}

// Función para mostrar la pregunta actual
function showQuestion(index) {
    const question = questions[index];
    const quizContainer = document.getElementById('quiz-container');
    const options = question.question.split(/A:|B:|C:|D:|E:/).slice(1);  // Dividir las opciones

    quizContainer.innerHTML = `
        <p><strong>Pregunta ${index + 1}:</strong> ${question.question.split(/A:|B:|C:|D:|E:/)[0]}</p>
        <div id="options">
            ${options.map((option, i) => `
                <label>
                    <input type="radio" name="answer" value="${String.fromCharCode(65 + i)}">
                    ${option.trim()}
                </label><br>
            `).join('')}
        </div>
        <button id="submit-btn">Submit</button>
    `;

    // Mostrar el botón de Submit
    document.getElementById('submit-btn').onclick = function () {
        checkAnswer(index);
    };
}

// Función para verificar la respuesta
function checkAnswer(index) {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Por favor, selecciona una respuesta.");
        return;
    }

    const answer = selectedOption.value;  // La respuesta seleccionada
    const correctAnswer = questions[index].answer;  // La respuesta correcta

    // Mostrar si la respuesta es correcta o incorrecta
    const feedback = answer === correctAnswer ? "¡Correcto!" : "Incorrecto.";
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML += `
        <p><strong>Respuesta correcta: </strong>${correctAnswer}</p>
        <p>${feedback}</p>
        <button id="next-btn">Siguiente pregunta</button>
    `;

    // Mostrar el botón "Siguiente"
    document.getElementById('next-btn').onclick = function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            quizContainer.innerHTML = "<p>¡Has terminado el quiz!</p>";
        }
    };
}

loadQuestions();  // Cargar las preguntas al inicio
