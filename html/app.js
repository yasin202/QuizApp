import { GeneralInfoQuestions } from "./data.js";
const $ = document;
const questionElem = $.querySelector('.question-container p');
const btns = $.querySelectorAll('.options-btn');
const timerFill = $.querySelector('#fill');
const homePageBtn = $.querySelector('#home-page');
const refreshGameBtn = $.querySelector('#refresh-game');
const boxModle = $.querySelector('.box-modle');
const scoreElem = $.querySelector('#score');

let score = 0
let questionAnswer = null
let questionsArray = null

let getCategory = () => {
    const locationParams = new URLSearchParams(location.search)
    const targetCategory = locationParams.get('category');
    switch (targetCategory) {
        case 'اطلاعات عمومی':
            get5RandomQuestions(GeneralInfoQuestions);
            break;
        default:
            alert('something went wrong!');
    };
}


let get5RandomQuestions = (q1) => {
    let shuffled = q1
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    shuffled = shuffled.slice(-5)
    console.log('shuffled', shuffled);
    questionsArray = shuffled

    displayQuestion()
}
let questionIndex = 0
let optionsIndex = 0

let displayQuestion = () => {

    if (questionIndex < 5) {
        questionElem.textContent = questionsArray[questionIndex].q
        questionAnswer = questionsArray[questionIndex].answer
        btns.forEach(btn => {
            btn.textContent = questionsArray[questionIndex].options[optionsIndex]
            optionsIndex++
        })
        optionsIndex = 0
        questionIndex++

        btns.forEach(btn => {
            btn.classList.remove('green');
            btn.classList.remove('red');
        })
    } else {
        scoreElem.textContent = score
        boxModle.classList.add('visable');
        timerFill.classList.remove('timer-fill')
    }
    timerFill.classList.remove('timer-fill')
    setTimeout(() => {
        timerFill.classList.add('timer-fill')
    }, 100);

    
}

let checkAnswer = (e) => {
    timerFill.classList.remove('timer-fill')
    if (e.target.textContent === questionAnswer) {
        score++
        e.target.classList.add('green')
        setTimeout(() => {
            // e.target.classList.remove('green')
            displayQuestion()
            timerReset()
        }, 1000);
    } else {
        e.target.classList.add('red')
        btns.forEach(btn => {
            if (btn.textContent === questionAnswer) {
                btn.classList.add('green')
                return
            }
        })
        setTimeout(() => {
            // e.target.classList.remove('green')
            displayQuestion()
            timerReset()
        }, 1000);
    }
}

let timerReset = () => {
        // timerFill.classList.remove('timer-fill')
        // setTimeout(() => {
        //     timerFill.classList.add('timer-fill')
        // }, 100);
        timerFill.classList.add('timer-fill')

}


timerFill.addEventListener('animationend', displayQuestion)

window.addEventListener('load', getCategory);

btns.forEach(btn => {
    btn.addEventListener('click', checkAnswer)
})

homePageBtn.addEventListener('click', () => window.history.back());
refreshGameBtn.addEventListener('click', () => {
    score = 0
    questionAnswer = null
    questionsArray = null
    questionIndex = 0
    boxModle.classList.remove('visable')
    getCategory()
});