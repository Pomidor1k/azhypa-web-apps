window.addEventListener('DOMContentLoaded', async () => {
    windowStart()
    setUserLanguage()
    const userAnswers = {
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answer5: []
    }
    let questionNumber = 1
    

    const answers_buttons = document.querySelectorAll('.answer_item')
    answers_buttons.forEach(button => {
        button.addEventListener('click', async () => {
            if (questionNumber !== 5) {
                if (!button.classList.contains('item_active')) {
                    resetAllButtonsStyles();
                    setTimeout(() => {
                        button.classList.add('item_active');
                    }, 50); // задержка в 50 миллисекунд
                } else {
                    button.classList.remove('item_active');
                }
            }
            

            if (questionNumber === 1) {
                if (userAnswers.answer1 !== button.id) {
                    userAnswers.answer1 = button.id
                } else {
                    button.classList.remove('item_active')
                }
            } else if (questionNumber === 2) {
                if (userAnswers.answer2 !== button.id) {
                    userAnswers.answer2 = button.id
                } else {
                    button.classList.remove('item_active')
                }
            } else if (questionNumber === 3) {
                if (userAnswers.answer3 !== button.id) {
                    userAnswers.answer3 = button.id
                } else {
                    button.classList.remove('item_active')
                } 
            } else if (questionNumber === 4) {
                if (userAnswers.answer4 !== button.id) {
                    userAnswers.answer4 = button.id
                } else {
                    button.classList.remove('item_active')
                }
            } else if (questionNumber === 5) {
                const answerId = button.id;

                if (userAnswers.answer5.includes(answerId)) {
                    // Если ответ уже в массиве, удалите его
                    userAnswers.answer5 = userAnswers.answer5.filter(item => item !== answerId);        
                    button.classList.remove('item_active');
                } else {
                    userAnswers.answer5.push(answerId);
                    button.classList.add('item_active');
                }
                console.log(userAnswers);
            }
        })
    })
    const next_question_button = document.querySelector('.next_question')
    next_question_button.addEventListener('click', () => {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id
        let userLanguage
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
            userLanguage = data.data
        })
        if (questionNumber === 1 && !userAnswers.answer1) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before moving on to the next question.");
            return;
        } else if (questionNumber === 2 && !userAnswers.answer2) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before moving on to the next question.");
            return;
        } else if (questionNumber === 3 && !userAnswers.answer3) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before moving on to the next question.");
            return;
        } else if (questionNumber === 4 && !userAnswers.answer4) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к следующему вопросу." : "Please select an answer before moving on to the next question.");
            return;
        } else if (questionNumber === 5 && userAnswers.answer5.length === 0) {
            alert(userLanguage === 'ru' ? "Пожалуйста, выберите ответ перед переходом к результатам." : "Please select an answer before proceeding to the results.");
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

        } else if (questionNumber === 4) {

            const currentQustionContainer = document.querySelector('.qst3_display')
            const nextQuestionContainer = document.querySelector('.qst4_display')

            currentQustionContainer.style.display = 'none'
            nextQuestionContainer.style.display = 'flex'

            const currentHeaderContainer = document.querySelector('.qst3_header')
            const nextHeaderContainer = document.querySelector('.qst4_header')

            currentHeaderContainer.style.display = 'none'
            nextHeaderContainer.style.display = 'flex'
            
        } else if (questionNumber === 5) {

            const currentQustionContainer = document.querySelector('.qst4_display')
            const nextQuestionContainer = document.querySelector('.qst5_display')

            currentQustionContainer.style.display = 'none'
            nextQuestionContainer.style.display = 'flex'

            const currentHeaderContainer = document.querySelector('.qst4_header')
            const nextHeaderContainer = document.querySelector('.qst5_header')

            currentHeaderContainer.style.display = 'none'
            nextHeaderContainer.style.display = 'flex'

            next_question_button.textContent = 'Узнать результат'
            
        } else if (questionNumber === 6) {
            if (userAnswers.answer5.length === 2) {
                if (userAnswers.answer1 === 'qst1_answ1') {
                    if (userAnswers.answer2 === 'qst2_answ4') {
                        if (userAnswers.answer3 === 'qst3_answ2') {
                            if (userAnswers.answer4 === 'qst4_answ1') {
                                if (userAnswers.answer5[0] === 'qst5_answ1' && userAnswers.answer5[1] === 'qst5_answ2') {

                                    testPassed()
                                } else if (userAnswers.answer5[0] === 'qst5_answ2' && userAnswers.answer5[1] === 'qst5_answ1') {
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
        console.log(data); // Выводим ответ сервера
    
        // Пример того, что можно сделать с ответом
        if (data.data) {
            const userLanguage = data.data;
            console.log(userLanguage);
            if (userLanguage !== "ru") {
                console.log("works");
                document.querySelector('#qst1_text').textContent = "What does the concept of Immersive/Immersive mean?"
                const qst1_desc = document.querySelector('#qst1_desc').textContent = "Choose one answer"
                const qst2_text = document.querySelector('#qst2_text').textContent = "What is the most significant difference between perception by eyes and by a camera?"
                const qst2_desc = document.querySelector('#qst2_desc').textContent = "Choose one answer"
                const qst3_text = document.querySelector('#qst3_text').textContent = "The most critical limitation of painting"
                const qst3_desc = document.querySelector('#qst3_desc').textContent = "Choose one answer"
                const qst4_text = document.querySelector('#qst4_text').textContent = "The immersive effect in visuals is"
                const qst4_desc = document.querySelector('#qst4_desc').textContent = "Choose one answer"
                const qst5_text = document.querySelector('#qst5_text').textContent = "Main goal"
                const qst5_desc = document.querySelector('#qst5_desc').textContent = "Choose several answers"
                const qst1_answ1 = document.querySelector('#qst1_answ1').textContent = "Immersing the viewer"
                const qst1_answ2 = document.querySelector('#qst1_answ2').textContent = "Rhythmic, dynamic"
                const qst1_answ3 = document.querySelector('#qst1_answ3').textContent = "Framing"
                const qst1_answ4 = document.querySelector('#qst1_answ4').textContent = "Conscious, structured"
                const qst2_answ1 = document.querySelector('#qst2_answ1').textContent = "FOV"
                const qst2_answ2 = document.querySelector('#qst2_answ2').textContent = "Discernibility/resolution"
                const qst2_answ3 = document.querySelector('#qst2_answ3').textContent = "Light projection"
                const qst2_answ4 = document.querySelector('#qst2_answ4').textContent = "Number of information receivers"
                const qst3_answ1 = document.querySelector('#qst3_answ1').textContent = "Detailing"
                const qst3_answ2 = document.querySelector('#qst3_answ2').textContent = "Absence of parallaxes"
                const qst3_answ3 = document.querySelector('#qst3_answ3').textContent = "Complexity of implementation"
                const qst3_answ4 = document.querySelector('#qst3_answ4').textContent = "Number of image layers"
                const qst4_answ1 = document.querySelector('#qst4_answ1').textContent = "Profound lightness"
                const qst4_answ2 = document.querySelector('#qst4_answ2').textContent = "Presence of perspective"
                const qst4_answ3 = document.querySelector('#qst4_answ3').textContent = "Use of haze"
                const qst4_answ4 = document.querySelector('#qst4_answ4').textContent = "Contrast"
                const qst5_answ1 = document.querySelector('#qst5_answ1').textContent = "Reduce the time to perceive information in the frame"
                const qst5_answ2 = document.querySelector('#qst5_answ2').textContent = "Emphasize the depth to the maximum"
                const qst5_answ3 = document.querySelector('#qst5_answ3').textContent = "Use of haze"
                const qst5_answ4 = document.querySelector('#qst5_answ4').textContent = "Contrast"
                const next_question = document.querySelector('#next_question').textContent = "Next"
                const question_text = document.querySelector('#question_text').textContent = "Great, the test is passed! You can continue your education"
                const question_description = document.querySelector('#question_description').textContent = "Click the button in the bot to continue"
                const back_to_bot_button = document.querySelector('#back_to_bot_button').textContent = "Return to the Bot"
                const question_text_not_passed = document.querySelector('#question_text_not_passed').textContent = "Unfortunately, the test was not passed. You can try again!"
                const question_description_not_passed = document.querySelector('#question_description_not_passed').textContent = "You will be able to skip the test after three attempts"
                const restart_test_button = document.querySelector('#restart_test_button').textContent = "Try again"
                
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
        fetch('/api/addFirstTestPassed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                firstTestPassed: true
            })
        })
        .then(response => response.json())
    } catch (error) {
        
    }
}

async function testNotPassed() {

    const currentWindow = document.querySelector('.page_wrapper')
    const nextWindow = document.querySelector('.test_not_passed_window')

    currentWindow.style.display = 'none'
    nextWindow.style.display = 'flex'
    fetch('/api/addFirstTestCount', {
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