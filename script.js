const quizDB = [
    {
        question: "Q1: Who is the father of HTML?",
        a: "Rasmus Lerdorf",
        b: "Tim Berners-Lee",
        c: "Brendan Eich",
        d: "Sergey Brin",
        ans: "ans2"
    },
    {
        question: "Q2: HTML stands for __________",
        a: "HyperText Markup Language",
        b: "HyperText Machine Language",
        c: "HyperText Marking Language",
        d: "HighText Marking Language",
        ans: "ans1"
    },
    {
        question: "Q3: In which part of the HTML metadata is contained? ",
        a: "Head tag",
        b: "Title tag",
        c: "Html tag",
        d: "Body tah",
        ans: "ans1"
    },
    {
        question: "Q4: Which element is used for or styling HTML5 layout? ",
        a: "CSS",
        b: "jQuery",
        c: "JavaScript",
        d: "PHP",
        ans: "ans1"
    },
    {
        question: "Q5: Which tag is used to create a blank line in HTML? ",
        a: "<b>",
        b: "<br>",
        c: "<em>",
        d: "<a>",
        ans: "ans2"
    }

]

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');
const timer = document.querySelector('#timer');

const answers = document.querySelectorAll('.answer');

const showScore = document.querySelector('#showScore')

const questionList = document.querySelector('.question-list')


let currentIndex = 0;
const loadQuestion = () => {
    const questionList = quizDB[currentIndex];
    question.innerText = questionList.question;
    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;
}
loadQuestion();

let clockTimer;
const displayTime = () => {
    var time = 10 * quizDB.length;
    clockTimer = setInterval(() => {
        time--;
        timer.innerText = `Time Left ${time} S`;
        if (time === 0) {
            getResult();
            clearInterval(clockTimer);
        }
    }, 1000)
}
displayTime();

var totalScore = 0;
const getScore = () => {
    let score = 0;
    answersList.map((ele, index) => {
        if (ele === quizDB[index].ans) {
            score++;
        }
    })
    totalScore = score;
    return score;
}


const getResult = () => {
    document.getElementsByClassName("inner-div")[0].style.display = 'none'
    getScore();
    showScore.innerHTML = `
        <h3>Your score ${totalScore}/${quizDB.length}</h3>
         <button class="btn" onclick="location.reload()">Take Quiz Again</button>`;
    showScore.classList.remove("showArea");

}

const answersList = [];

for (let i = 0; i < quizDB.length; i++) {
    answersList.push('');
}


function loadQuestionIndex() {
    questionList.innerText = '';
    for (let j = 0; j < quizDB.length; j++) {
        const quest = document.createElement("button")
        quest.className = 'quest-index' + (currentIndex === j ? ' select' : '') + (answersList[j] !== '' ? ' answered' : '')
        quest.addEventListener("click", function () {
            currentIndex = j;
            loadQuestionIndex();
            loadQuestion();
        });
        quest.innerText = j + 1;
        questionList.appendChild(quest)
    }
}
loadQuestionIndex();


const getCheckAnswer = () => {
    let answer;
    answers.forEach((currentAnsElement) => {
        if (currentAnsElement.checked) {
            answer = currentAnsElement.id;
        };
    });
    return answer;
};


const deselectAll = () => {
    answers.forEach((currentAnsElement) => {
        currentAnsElement.checked = false;
    })
};

submit.addEventListener('click', () => {
    const myAnswer = getCheckAnswer();
    answersList[currentIndex] = myAnswer ? myAnswer : '';
    document.getElementById("end-test").disabled = !answersList.every(k => k !== '')
    if (currentIndex === quizDB.length - 1) {
        loadQuestionIndex();
        return;
    }else{
        currentIndex++;
        deselectAll();
        loadQuestion();
        loadQuestionIndex();
    }
})

document.getElementById("end-test").addEventListener('click', () => {
    clearInterval(clockTimer);
    getResult();
})