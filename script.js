// variables
let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
const introEl = document.querySelector("#bodytext");

const questionsEl = document.querySelector("#questions");

let questionEl = document.querySelector("#question");

let questionCount = 0;

const yesnoEl = document.querySelector("#yesno");

const finalEl = document.querySelector("#final");

let initialsInput = document.querySelector("#initials");

const highscoresEl = document.querySelector("#highscores");

let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

// buttons
const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("Btn1")
// answer 1
const ans1Btn = document.querySelector("#answer1");
// answer2
const ans2Btn = document.querySelector("#answer2");
// answer3
const ans3Btn = document.querySelector("#answer3");
// answer4
const ans4Btn = document.querySelector("#answer4");

const submitScBtn = document.querySelector("#submit-score");

const goBackBtn = document.querySelector("#goback");
// clearscores
const clearScrBtn = document.querySelector("#clearscores");
// view-scores
const viewScrBtn = document.querySelector("#view-score");

// questions for quiz
const questions = [
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "booleans"
    },
    {
        question: "Javascript is an _______ language?",
        answers: ["Object-Oriented", "Object-Based", "Procedural", "all of the above"],
        correctAnswer: "Object-Oriented"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        answers: ["const", "var", "Both A and B", "constant"],
        correctAnswer: "const"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "for loops"
    },
    {
        question: "Commonly used data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "booleans"
    }
];

// functions and timer

function setTime(){
    let timerInterval = setInterval(function (){
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
    }
}, 1000);
}

// start quiz with timer
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}
// displays questions
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}
// check answer to see if correct/incorrect
function checkAnswer(event) {
    let p = document.createElement("p");
    if (questions[questionCount].correctAnswer === event.target.textContent) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.textContent) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }
    event.preventDefault();
    questionCount++;
    setQuestion(questionCount);
    yesnoEl.style.display = "block";
    
    yesnoEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    
    
    // if (questionCount < questions.length) {
    //     questionCount++;
    // }
    // setQuestion(questionCount);
}

// display after the question
function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}
// localstorage
function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {

    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// EventListeners for functions
startBtn.addEventListener("click", startQuiz);

ans1Btn.addEventListener("click", checkAnswer);
ans2Btn.addEventListener("click", checkAnswer);
ans3Btn.addEventListener("click", checkAnswer);
ans4Btn.addEventListener("click", checkAnswer);



// ansBtn.forEach(item => {
//     item.addEventListener('click', checkAnswer);
// });

// submit score
submitScBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});


// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});
