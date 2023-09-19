window.addEventListener('DOMContentLoaded', async () => {
    windowStart()
    setUserLanguage()
    const userAnswers = {
        answer1: [],
        answer2: "",
        answer3: [],
    }
    let questionNumber = 1
    

    const answers_buttons = document.querySelectorAll('.answer_item')
    answers_buttons.forEach(button => {
        button.addEventListener('click', async () => {
            if (questionNumber !== 1 && questionNumber !== 3) {
                if (!button.classList.contains('item_active')) {
                    resetAllButtonsStyles();
                    setTimeout(() => {
                        button.classList.add('item_active');
                    }, 50);
                } else {
                    button.classList.remove('item_active');
                }
            }
            

            if (questionNumber === 1) {
                const answerId = button.id;

                if (userAnswers.answer1.includes(answerId)) {
                    // Если ответ уже в массиве, удалите его
                    userAnswers.answer1 = userAnswers.answer1.filter(item => item !== answerId);        
                    button.classList.remove('item_active');
                } else {
                    userAnswers.answer1.push(answerId);
                    button.classList.add('item_active');
                }
            } else if (questionNumber === 2) {
                if (userAnswers.answer2 !== button.id) {
                    userAnswers.answer2 = button.id
                } else {
                    button.classList.remove('item_active')
                }
            } else if (questionNumber === 3) {
                const answerId = button.id;

                if (userAnswers.answer3.includes(answerId)) {
                    // Если ответ уже в массиве, удалите его
                    userAnswers.answer3 = userAnswers.answer3.filter(item => item !== answerId);        
                    button.classList.remove('item_active');
                } else {
                    userAnswers.answer3.push(answerId);
                    button.classList.add('item_active');
                }
            }
        })
    })
    const next_question_button = document.querySelector('.next_question')
    next_question_button.addEventListener('click', () => {
        const userLanguage = document.querySelector('#qst1_desc').textContent === "Choose one answer" ? "en" : "ru"
        if (questionNumber === 1 && userAnswers.answer1.length === 0) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before proceeding to the next question.");
            return;
        } else if (questionNumber === 2 && !userAnswers.answer2) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before proceeding to the next question.");
            return;
        } else if (questionNumber === 3 && userAnswers.answer3.length === 0) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before proceeding to the next question.");
            return;
        }

        questionNumber ++
        resetAllButtonsStyles()

        if (questionNumber === 2) {

            const currentQustionContainer = document.querySelector('.qst1_display')
            const nextQuestionContainer = document.querySelector('.qst2_display')

            currentQustionContainer.style.display = 'none'
            nextQuestionContainer.style.display = 'flex'

            const currentHeaderContainer = document.querySelector('.qst1_header')
            const nextHeaderContainer = document.querySelector('.qst2_header')

            currentHeaderContainer.style.display = 'none'
            nextHeaderContainer.style.display = 'flex'

        } else if (questionNumber === 3) {

            const currentQustionContainer = document.querySelector('.qst2_display')
            const nextQuestionContainer = document.querySelector('.qst3_display')

            currentQustionContainer.style.display = 'none'
            nextQuestionContainer.style.display = 'flex'

            const currentHeaderContainer = document.querySelector('.qst2_header')
            const nextHeaderContainer = document.querySelector('.qst3_header')

            currentHeaderContainer.style.display = 'none'
            nextHeaderContainer.style.display = 'flex'

            next_question_button.textContent = 'Узнать результат'
            
        } else if (questionNumber === 4) {
            if (userAnswers.answer1.length === 2 && userAnswers.answer3.length === 2) {
                if (userAnswers.answer1.includes('qst1_answ1') && userAnswers.answer1.includes('qst1_answ2')) {
                    if (userAnswers.answer3.includes('qst3_answ1') && userAnswers.answer3.includes('qst3_answ2')) {
                        testPassed()
                    } else {
                        testNotPassed()
                    }
                } else {
                    testNotPassed()
                }
            } else {
                testNotPassed()
            }
        }

    })

    const restartTestButton = document.querySelector('.restart_test_button')
    restartTestButton.addEventListener('click', async () => {
        location.reload()
    })
    const backToBotButton = document.querySelector('.back_to_bot_button')
    backToBotButton.addEventListener('click', async () => {
        window.Telegram.WebApp.close()
    })
})

function setUserLanguage() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id
    fetch('/api/getUserLanguage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    

        if (data.data) {
            const userLanguage = data.data;
            console.log(userLanguage);
            if (userLanguage !== "ru") {
                console.log("works");
                document.querySelector('#qst1_text').textContent = "The artist's purpose in other words"
                document.querySelector('#qst1_desc').textContent = "Choose several answers"
                document.querySelector('#qst2_text').textContent = "The main tool of accentuation"
                document.querySelector('#qst2_desc').textContent = "Choose one answer"
                document.querySelector('#qst3_text').textContent = "Functions of light"
                document.querySelector('#qst3_desc').textContent = "Choose several answers"
                document.querySelector('#qst1_answ1').textContent = "Simplify perception"
                document.querySelector('#qst1_answ2').textContent = "Deepen the image"
                document.querySelector('#qst1_answ3').textContent = "Enrich with attention points (3 or more)"
                document.querySelector('#qst1_answ4').textContent = "Rely on one's mood"
                document.querySelector('#qst2_answ1').textContent = "Detailing"
                document.querySelector('#qst2_answ2').textContent = "Light"
                document.querySelector('#qst2_answ3').textContent = "Smoke"
                document.querySelector('#qst2_answ4').textContent = "Depth of field"
                document.querySelector('#qst3_answ1').textContent = "Accents"
                document.querySelector('#qst3_answ2').textContent = "Emphasizing the volume of geometry"
                document.querySelector('#qst3_answ3').textContent = "Space deficit"
                document.querySelector('#qst3_answ4').textContent = "Depth of field"
                document.querySelector('#next_question').textContent = "Next"
                document.querySelector('#question_text').textContent = "Great, the test is passed! You can continue your education"
                document.querySelector('#question_description').textContent = "Click the button in the bot to continue"
                document.querySelector('#back_to_bot_button').textContent = "Return to the Bot"
                document.querySelector('#question_text_not_passed').textContent = "Unfortunately, the test was not passed. You can try again!"
                document.querySelector('#question_description_not_passed').textContent = "You will be able to skip the test after three attempts"
                document.querySelector('#restart_test_button').textContent = "Try again"
                
            }
        } else {
            console.error("Failed to get user language");
        }
    })
    .catch(error => {
        console.error("Error while fetching user language:", error);
    });
}

function windowStart() {
    window.Telegram.WebApp.expand()
    resetAllButtonsStyles()
}

function getUserLanguage() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id
    fetch('/api/sendUserId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.data === 'en') {
            
        } else {

        }
    })
}

function resetAllButtonsStyles() {
    const answers_buttons = document.querySelectorAll('.answer_item')
    answers_buttons.forEach(btn => {
        btn.classList.remove('item_active')
    });
}

function testPassed() {
    const currentWindow = document.querySelector('.page_wrapper')
    const nextWindow = document.querySelector('.test_passed_window')

    currentWindow.style.display = 'none'
    nextWindow.style.display = 'flex'

    try {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id
        fetch('/api/addSecondTestPassed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                secondTestPassed: true
            })
        })
        .then(response => response.json())
    } catch (error) {
        
    }
}

function testNotPassed() {
    const currentWindow = document.querySelector('.page_wrapper')
    const nextWindow = document.querySelector('.test_not_passed_window')

    currentWindow.style.display = 'none'
    nextWindow.style.display = 'flex'

    fetch('/api/addSecondTestCount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: window.Telegram.WebApp.initDataUnsafe.user.id
        })
    })
    .then(response => response.json())
}