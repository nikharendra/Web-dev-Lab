// script.js

// Quiz questions (with escaped HTML tags)
const quizQuestions = [{
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correctAnswer: 2
    },
    {
        question: "Where is the correct place to insert a JavaScript file in an HTML document?",
        answers: [
            "In the &lt;head&gt; section",
            "At the end of the &lt;body&gt; section",
            "Both &lt;head&gt; and &lt;body&gt; are correct",
            "In a separate CSS file"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            "class",
            "font",
            "styles",
            "style"
        ],
        correctAnswer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');"
        ],
        correctAnswer: 2
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers: [
            "bgcolor",
            "background-color",
            "color-background",
            "background"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        answers: [
            "&lt;script href='script.js'&gt;",
            "&lt;script name='script.js'&gt;",
            "&lt;script src='script.js'&gt;",
            "&lt;script file='script.js'&gt;"
        ],
        correctAnswer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            "function = myFunction()",
            "function:myFunction()",
            "function myFunction()",
            "create myFunction()"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        answers: [
            "&lt;footer&gt;",
            "&lt;bottom&gt;",
            "&lt;section&gt;",
            "&lt;div&gt;"
        ],
        correctAnswer: 0
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        answers: [
            "*",
            "-",
            "=",
            "x"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the time complexity of Binary Search?",
        answers: [
            "O(n)",
            "O(log n)",
            "O(n log n)",
            "O(n^2)"
        ],
        correctAnswer: 1
    },
    {
        question: "Which data structure follows the LIFO (Last In, First Out) principle?",
        answers: [
            "Array",
            "Link-list",
            "Stack",
            "Tree"
        ],
        correctAnswer: 2
    },
    {
        question: "Which data structure follows the FIFO (First In, First Out) principle?",
        answers: [
            "Stack",
            "Queue",
            "Graph",
            "None"
        ],
        correctAnswer: 1
    },
    {
        question: "Which sorting algorithm has the best average-case time complexity?",
        answers: [
            "Bubble Sort",
            "Quick Sort",
            "Merge Sort",
            "None"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the worst-case time complexity of Quick Sort?",
        answers: [
            "O(n^3)",
            "O(log n)",
            "O(n)",
            "O(n^2)"
        ],
        correctAnswer: 3
    },
    {
        question: "Which traversal of a Binary Search Tree (BST) gives the elements in sorted order?",
        answers: [
            "Preorder",
            "Inorder",
            "Level Order",
            "None"
        ],
        correctAnswer: 1
    },
    {
        question: "Which data structure is mainly used to implement recursion?",
        answers: [
            "Queue",
            "Stack",
            "Tree",
            "None"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the time complexity of inserting an element at the beginning of a linked list?",
        answers: [
            "O(1)",
            "O(n)",
            "O(n^2)",
            "None"
        ],
        correctAnswer: 0
    },
    {
        question: "Which graph traversal algorithm uses a queue?",
        answers: [
            "DFS",
            "BFS",
            "Dijkstra",
            " Prim's Algorithm"
        ],
        correctAnswer: 1
    },
    {
        question: " Which of the following data structures is used to implement a priority queue?",
        answers: [
            "Stack",
            "Tree",
            "Heap",
            "None"
        ],
        correctAnswer: 2
    }
];

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 40;
let userAnswers = Array(quizQuestions.length).fill(null);

// DOM elements
const quizContainer = document.getElementById('quiz-container');

// Initialize the quiz
function initQuiz() {
    showStartScreen();
}

// Show start screen
function showStartScreen() {
    quizContainer.innerHTML = `
        <div class="p-8 text-center fade-in">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Web Development Quiz</h1>
            <p class="text-gray-600 mb-6">Test your knowledge of HTML, CSS, and JavaScript and Basic DSA with this ${quizQuestions.length}-question quiz.</p>
            <p class="text-gray-500 mb-8">You'll have 40 seconds to answer each question. You can navigate freely between questions.</p>
            <button id="start-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                Start Quiz
            </button>
        </div>
    `;

    document.getElementById('start-btn').addEventListener('click', startQuiz);
}

// Start the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    userAnswers = Array(quizQuestions.length).fill(null);
    showQuestion();
}

// Show current question
function showQuestion() {
    clearInterval(timer);

    const question = quizQuestions[currentQuestionIndex];
    timeLeft = 40;

    // Check if user has already answered this question
    const userAnswer = userAnswers[currentQuestionIndex];

    // Create answer buttons HTML
    let answersHTML = '';
    question.answers.forEach((answer, index) => {
        let buttonClass = "answer-btn w-full text-left p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition mb-2";

        // If user has answered this question before
        if (userAnswer !== null) {
            if (index === question.correctAnswer) {
                buttonClass += " correct";
            } else if (index === userAnswer && userAnswer !== question.correctAnswer) {
                buttonClass += " incorrect";
            }
        }

        answersHTML += `
            <button 
                data-answer="${index}"
                class="${buttonClass}"
                ${userAnswer !== null ? 'disabled' : ''}
            >
                ${answer}
            </button>
        `;
    });

    quizContainer.innerHTML = `
        <div class="fade-in">
            <div class="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div class="font-semibold">Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</div>
                <div id="timer" class="timer ${timeLeft <= 10 ? 'timer-danger' : timeLeft <= 20 ? 'timer-warning' : 'bg-blue-700'}">
                    ${timeLeft}
                </div>
            </div>
            
            <div class="p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-6">${question.question}</h2>
                <div class="space-y-3">
                    ${answersHTML}
                </div>
            </div>
            
            <div class="bg-gray-50 p-4 flex justify-between items-center">
                <div class="flex space-x-2">
                    <button id="prev-btn" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                        Previous
                    </button>
                    <button id="next-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentQuestionIndex === quizQuestions.length - 1 ? 'hidden' : ''}">
                        ${userAnswer !== null ? 'Next Question' : 'Skip Question'}
                    </button>
                    <button id="submit-btn" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${currentQuestionIndex !== quizQuestions.length - 1 ? 'hidden' : ''}">
                        Submit Quiz
                    </button>
                </div>
                <div class="font-semibold">Score: ${score}</div>
            </div>
        </div>
    `;

    // Start timer only if question hasn't been answered
    if (userAnswer === null) {
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeUp();
            }
        }, 1000);
    }

    // Add event listeners
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswerClick);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        navigateToQuestion(currentQuestionIndex - 1);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        navigateToQuestion(currentQuestionIndex + 1);
    });

    if (document.getElementById('submit-btn')) {
        document.getElementById('submit-btn').addEventListener('click', showResults);
    }
}

// Navigate to specific question
function navigateToQuestion(index) {
    if (index >= 0 && index < quizQuestions.length) {
        currentQuestionIndex = index;
        showQuestion();
    }
}

// Update timer display
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = timeLeft;

        timerElement.className = 'timer';
        if (timeLeft <= 10) {
            timerElement.classList.add('timer-danger');
        } else if (timeLeft <= 20) {
            timerElement.classList.add('timer-warning');
        } else {
            timerElement.classList.add('bg-blue-700');
        }
    }
}

// Handle time up
function handleTimeUp() {
    // Mark as unanswered
    if (userAnswers[currentQuestionIndex] === null) {
        userAnswers[currentQuestionIndex] = -1; // -1 means unanswered
        if (score > 0) score--;
    }

    // Enable navigation
    enableNavigation();
}

// Handle answer click
function handleAnswerClick(e) {
    clearInterval(timer);

    const selectedBtn = e.target;
    const selectedAnswer = parseInt(selectedBtn.getAttribute('data-answer'));
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    // Save user's answer
    userAnswers[currentQuestionIndex] = selectedAnswer;

    // Disable all answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
    });

    // Mark correct/incorrect answers
    if (selectedAnswer === correctAnswer) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        // Show correct answer
        document.querySelector(`[data-answer="${correctAnswer}"]`).classList.add('correct');

        // Deduct point for wrong answer
        if (score > 0) score--;
    }

    // Update score display
    document.querySelector('.bg-gray-50 .font-semibold').textContent = `Score: ${score}`;

    // Enable navigation
    enableNavigation();
}

// Enable navigation buttons
function enableNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
        prevBtn.classList.toggle('opacity-50', currentQuestionIndex === 0);
        prevBtn.classList.toggle('cursor-not-allowed', currentQuestionIndex === 0);
    }

    if (nextBtn) {
        nextBtn.textContent = 'Next Question';
    }
}

// Show results
function showResults() {
    // Calculate final score
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            finalScore++;
        }
    });

    quizContainer.innerHTML = `
        <div class="p-8 text-center fade-in">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Quiz Completed!</h1>
            <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
                <p class="font-bold text-xl">Your Score: ${finalScore} out of ${quizQuestions.length}</p>
                <p class="mt-2">${getResultMessage(finalScore, quizQuestions.length)}</p>
            </div>
            
            <div class="mb-8">
                <h3 class="text-lg font-semibold mb-3">Question Review:</h3>
                <div class="space-y-2 text-left max-h-96 overflow-y-auto">
                    ${quizQuestions.map((q, i) => `
                        <div class="p-3 border rounded ${userAnswers[i] === q.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}">
                            <p class="font-medium">${i+1}. ${q.question}</p>
                            <p>Your answer: ${userAnswers[i] !== null && userAnswers[i] !== -1 ? q.answers[userAnswers[i]] : 'Unanswered'}</p>
                            <p>Correct answer: ${q.answers[q.correctAnswer]}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button id="restart-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                Take Quiz Again
            </button>
        </div>
    `;
    
    document.getElementById('restart-btn').addEventListener('click', startQuiz);
}

// Get result message based on score
function getResultMessage(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    
    if (percentage >= 90) {
        return "Excellent! You're a web development expert!";
    } else if (percentage >= 70) {
        return "Great job! You have solid web development knowledge.";
    } else if (percentage >= 50) {
        return "Good effort! Consider reviewing some concepts.";
    } else {
        return "Keep learning! Web development takes practice.";
    }
}

// Initialize the quiz when the page loads
window.addEventListener('DOMContentLoaded', initQuiz);