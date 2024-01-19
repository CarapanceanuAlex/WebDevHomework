const startButton = document.getElementById('start')
const nextButton = document.getElementById('next')
const questionContainerElement = document.getElementById('container-intrebari')
const questionElement = document.getElementById('intrebare')
const answerButtonsElement = document.getElementById('butoane-raspunsuri')

let shuffledQuestions, currentQuestionIndex, corectAnswersCount
const corectCountElement = document.getElementById('corect-count')

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

function startGame(){
 startButton.classList.add('hide')
 shuffledQuestions = questions.sort(() => Math.random() -.5)
 currentQuestionIndex = 0;
 corectAnswersCount = 0;
 questionContainerElement.classList.remove('hide')
 corectCountElement.textContent = corectAnswersCount;
 nextQuestion();
}

function nextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
 questionElement.innerText = question.question
 answerButtonsElement.classList.remove('hide');
 question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('buton')
    if (answer.corect) {
        button.dataset.corect = answer.corect
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
 })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const iscorect = selectedButton.dataset.corect === 'true';

    setStatusClass(document.body, iscorect);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.corect === 'true');
    });

    if (iscorect) {
        corectAnswersCount++;
        corectCountElement.textContent = corectAnswersCount;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        alert(`Ai avut ${corectAnswersCount} raspunsuri corecte din ${questions.length} intrebari.`);
        alert("Da restart ca ai fost prea smecher si ai terminat.");
    }
}

function setStatusClass(element, corect){
    clearStatusClass(element)
    if(corect){
        element.classList.add('corect')
    } 

    else {
        element.classList.add('gresit')
    }
}

function clearStatusClass(element){

        element.classList.remove('corect')
        element.classList.remove('gresit')
    }


const questions = [
    {
        question: '2+2 = ?',
        answers:[
            { text: '4', corect: true },
            { text: '-453534545', corect: false },
            { text: '69', corect: false},
            { text: '1', corect: false}
        ]
    },
    {
        question: 'Vine ceata?',
        answers: [
            { text: 'DA', corect: true },
            { text: 'DA', corect: true },
            { text: 'DA', corect: true },
            { text: 'DA', corect: true }
        ]
    },
    {
        question: 'Cata vointa mai am in mine?',
        answers: [
            { text: 'Nu multa', corect: true },
            { text: 'Suficienta', corect: false },
            { text: 'nush', corect: false },
            { text: '3 kg', corect: false }
        ]
    },
    {
        question: 'Care este cel mai mare copac din lume?',
        answers: [
            { text: 'Stejarul', corect: false },
            { text: 'Sequoia-ul gigantic', corect: true },
            { text: 'Teiul', corect: false },
            { text: 'Bradul', corect: false }
        ]
    },
    {
        question: 'In ce an a inceput WW1?',
        answers: [
            { text: '1914', corect: true },
            { text: '1960', corect: false },
            { text: '1905', corect: false },
            { text: '1990', corect: false }
        ]
    },
    {
        question: 'Ce cuvant incepe cu "C"?',
        answers: [
            { text: 'Cioara', corect: true },
            { text: 'Gioara', corect: false },
            { text: 'Tioara', corect: false },
            { text: 'Vioara', corect: false }
        ]
    },
    {
        question: 'Care lac se afla la cea mai mare elevatie?',
        answers: [
            { text: 'Apa din groapa Marianelor', corect: false },
            { text: 'Balta din spatele blocului', corect: false },
            { text: 'Marea Neagra', corect: false },
            { text: 'Titikaka', corect: true }
        ]
    },
    {
        question: 'Care e capitala Islandei?',
        answers: [
            { text: 'Reykjavik', corect: true },
            { text: 'Reykiavik', corect: false },
            { text: 'Reikjavik', corect: false },
            { text: 'Reycjavic', corect: false }
        ]
    },
    {
        question: 'In ce an a fost lansat primul joc FNAF?',
        answers: [
            { text: '2014', corect: true },
            { text: '2013', corect: false },
            { text: '2015', corect: false },
            { text: '2012', corect: false }
        ]
    },
    {
        question: 'Ce campion trebuie nerfuit pe lol?',
        answers: [
            { text: 'Gragas', corect: true },
            { text: 'Shaco', corect: false },
            { text: 'Twitch', corect: false },
            { text: 'Skarner', corect: false }
        ]
    }
];