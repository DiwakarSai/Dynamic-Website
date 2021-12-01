const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currrentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'what is 2+2',
        choice1:'2',
        choice2:'5',
        choice3:'4',
        choice4:'10',
        answer: 3,
    },
    {
        question: 'helklo ',
        choice1:'d',
        choice2:'dff',
        choice3:'ff',
        choice4:'vvfd',
        answer: 2,
    },
    {
        question: 'what is 2+2',
        choice1:'2',
        choice2:'5',
        choice3:'4',
        choice4:'10',
        answer: 2,
    },
    {
        question: 'what is 2+2',
        choice1:'2',
        choice2:'5',
        choice3:'4',
        choice4:'10',
        answer: 2,
    },
    {
        question: 'what is 2+2',
        choice1:'2',
        choice2:'5',
        choice3:'4',
        choice4:'10',
        answer: 2,
    }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion  = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currrentQuestion = availableQuestions[questionsIndex]
    question.innerText = currrentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currrentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return


        acceptingAnswers=false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
    
    let classToApply = selectedAnswer == currrentQuestion.answer ? 'correct' :
     'incorrect'

    if(classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classlist.add(classToApply)
    
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()

    },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()