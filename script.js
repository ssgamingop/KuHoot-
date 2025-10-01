// ==UserScript==
// @name         KuHoot!
// @version      1.0
// @namespace    https://github.com/ssgamingop
// @description  A hack for kahoot.it!
// @author       ssgamingop; https://github.com/ssgamingop
// @match        https://kahoot.it/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kahoot.it
// @grant        none
// ==/UserScript==
var Version = '1.0';

var questions = [];
var info = {
    numQuestions: 0,
    questionNum: -1,
    lastAnsweredQuestion: -1,
    defaultIL:true,
    ILSetQuestion:-1,
};
var PPT = 950;
var Answered_PPT = 950;
var autoAnswer = false;
var showAnswers = false;
var inputLag = 100;

function FindByAttributeValue(attribute, value, element_type)    {
  element_type = element_type || "*";
  var All = document.getElementsByTagName(element_type);
  for (var i = 0; i < All.length; i++)       {
    if (All[i].getAttribute(attribute) == value) { return All[i]; }
  }
}

// Enhanced UI with modern dark theme
const uiElement = document.createElement('div');
uiElement.className = 'floating-ui';
uiElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    min-height: 400px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    border-radius: 15px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
    z-index: 10000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
`;

// Modern header with dark gradient
const handle = document.createElement('div');
handle.className = 'handle';
handle.style.cssText = `
    background: linear-gradient(135deg, #e53e3e 0%, #dd6b20 50%, #d69e2e 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 15px 15px 0 0;
    cursor: grab;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    position: relative;
    user-select: none;
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
`;
handle.textContent = '🎯 KuHoot!';
uiElement.appendChild(handle);

// Improved close button with dark theme
const closeButton = document.createElement('div');
closeButton.className = 'close-button';
closeButton.innerHTML = '✕';
closeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
    background: rgba(229, 62, 62, 0.9);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s ease;
    backdrop-filter: blur(5px);
`;
closeButton.addEventListener('mouseenter', () => {
    closeButton.style.background = 'rgba(229, 62, 62, 1)';
    closeButton.style.transform = 'scale(1.1)';
    closeButton.style.boxShadow = '0 0 15px rgba(229, 62, 62, 0.6)';
});
closeButton.addEventListener('mouseleave', () => {
    closeButton.style.background = 'rgba(229, 62, 62, 0.9)';
    closeButton.style.transform = 'scale(1)';
    closeButton.style.boxShadow = 'none';
});
handle.appendChild(closeButton);

// Improved minimize button with dark theme
const minimizeButton = document.createElement('div');
minimizeButton.className = 'minimize-button';
minimizeButton.innerHTML = '─';
minimizeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 45px;
    width: 30px;
    height: 30px;
    background: rgba(214, 158, 46, 0.9);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s ease;
    backdrop-filter: blur(5px);
`;
minimizeButton.addEventListener('mouseenter', () => {
    minimizeButton.style.background = 'rgba(214, 158, 46, 1)';
    minimizeButton.style.transform = 'scale(1.1)';
    minimizeButton.style.boxShadow = '0 0 15px rgba(214, 158, 46, 0.6)';
});
minimizeButton.addEventListener('mouseleave', () => {
    minimizeButton.style.background = 'rgba(214, 158, 46, 0.9)';
    minimizeButton.style.transform = 'scale(1)';
    minimizeButton.style.boxShadow = 'none';
});
handle.appendChild(minimizeButton);

// Content container for better organization
const contentContainer = document.createElement('div');
contentContainer.style.cssText = `
    padding: 20px;
    color: white;
`;
uiElement.appendChild(contentContainer);

// Section creator function for consistency with dark theme
function createSection(title, content) {
    const section = document.createElement('div');
    section.style.cssText = `
        margin-bottom: 25px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 15px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    const header = document.createElement('h3');
    header.textContent = title;
    header.style.cssText = `
        margin: 0 0 15px 0;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    `;
    
    section.appendChild(header);
    section.appendChild(content);
    return section;
}

// Quiz ID Section with dark theme
const inputContainer = document.createElement('div');
const inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.placeholder = 'Enter Quiz ID...';
inputBox.style.cssText = `
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
`;
inputBox.addEventListener('focus', () => {
    inputBox.style.background = 'rgba(255, 255, 255, 0.15)';
    inputBox.style.transform = 'scale(1.02)';
    inputBox.style.boxShadow = '0 0 20px rgba(229, 62, 62, 0.3)';
});
inputBox.addEventListener('blur', () => {
    inputBox.style.background = 'rgba(255, 255, 255, 0.1)';
    inputBox.style.transform = 'scale(1)';
    inputBox.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});
inputContainer.appendChild(inputBox);
contentContainer.appendChild(createSection('🎯 Quiz ID', inputContainer));

// Points Section with dark theme
const pointsContainer = document.createElement('div');
const pointsLabel = document.createElement('div');
pointsLabel.textContent = 'Points per Question: 950';
pointsLabel.style.cssText = `
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 500;
    color: #fff;
`;

const pointsSlider = document.createElement('input');
pointsSlider.type = 'range';
pointsSlider.min = '500';
pointsSlider.max = '1000';
pointsSlider.value = '950';
pointsSlider.style.cssText = `
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(to right, #e53e3e, #dd6b20, #d69e2e);
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
`;

// Custom slider thumb styling
const style = document.createElement('style');
style.textContent = `
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e53e3e, #dd6b20);
        cursor: pointer;
        box-shadow: 0 0 10px rgba(229, 62, 62, 0.5);
    }
    
    input[type="range"]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e53e3e, #dd6b20);
        cursor: pointer;
        border: none;
        box-shadow: 0 0 10px rgba(229, 62, 62, 0.5);
    }
`;
document.head.appendChild(style);

pointsContainer.appendChild(pointsLabel);
pointsContainer.appendChild(pointsSlider);
contentContainer.appendChild(createSection('⚡ Points Configuration', pointsContainer));

pointsSlider.addEventListener('input', () => {
    const points = +pointsSlider.value;
    PPT = points;
    pointsLabel.textContent = 'Points per Question: ' + points;
});

// Answering Section
const answeringContainer = document.createElement('div');

// Modern toggle switch function
function createToggleSwitch(label, onChange) {
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        transition: all 0.3s ease;
    `;
    
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    labelEl.style.cssText = `
        font-size: 14px;
        font-weight: 500;
        color: #fff;
    `;
    
    const switchContainer = document.createElement('label');
    switchContainer.style.cssText = `
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        cursor: pointer;
    `;
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.style.cssText = `
        opacity: 0;
        width: 0;
        height: 0;
    `;
    
    const slider = document.createElement('span');
    slider.style.cssText = `
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.2);
        transition: 0.4s;
        border-radius: 24px;
    `;
    
    const thumb = document.createElement('span');
    thumb.style.cssText = `
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `;
    
    input.addEventListener('change', function() {
        if (this.checked) {
            slider.style.backgroundColor = '#4CAF50';
            thumb.style.transform = 'translateX(26px)';
        } else {
            slider.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            thumb.style.transform = 'translateX(0px)';
        }
        onChange(this.checked);
    });
    
    slider.appendChild(thumb);
    switchContainer.appendChild(input);
    switchContainer.appendChild(slider);
    container.appendChild(labelEl);
    container.appendChild(switchContainer);
    
    return { container, input };
}

const autoAnswerToggle = createToggleSwitch('🤖 Auto Answer', (checked) => {
    autoAnswer = checked;
    info.ILSetQuestion = info.questionNum;
});

const showAnswersToggle = createToggleSwitch('👁️ Show Answers', (checked) => {
    showAnswers = checked;
});

answeringContainer.appendChild(autoAnswerToggle.container);
answeringContainer.appendChild(showAnswersToggle.container);
contentContainer.appendChild(createSection('🎮 Answering Options', answeringContainer));

// Info Section
const infoContainer = document.createElement('div');
const questionsLabel = document.createElement('div');
questionsLabel.textContent = 'Question 0 / 0';
questionsLabel.style.cssText = `
    font-size: 14px;
    margin-bottom: 8px;
    text-align: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    font-weight: 500;
    color: #fff;
`;

const inputLagLabel = document.createElement('div');
inputLagLabel.textContent = 'Input lag: 125 ms';
inputLagLabel.style.cssText = `
    font-size: 14px;
    text-align: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    font-weight: 500;
    color: #fff;
`;

infoContainer.appendChild(questionsLabel);
infoContainer.appendChild(inputLagLabel);
contentContainer.appendChild(createSection('📊 Status', infoContainer));

// Footer Section
const footerContainer = document.createElement('div');
footerContainer.style.cssText = `
    text-align: center;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 15px 15px;
    margin: 0 -20px -20px -20px;
`;

const versionLabel = document.createElement('div');
versionLabel.textContent = `KuHoot! v${Version}`;
versionLabel.style.cssText = `
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #fff;
`;

const githubContainer = document.createElement('div');
githubContainer.style.cssText = `
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
`;

const githubLabel = document.createElement('span');
githubLabel.textContent = 'GitHub: ';

const githubUrl = document.createElement('a');
githubUrl.textContent = 'ssgamingop';
githubUrl.href = 'https://github.com/ssgamingop';
githubUrl.target = '_blank';
githubUrl.style.cssText = `
    color: #e53e3e;
    text-decoration: none;
    font-weight: 600;
`;

githubContainer.appendChild(githubLabel);
githubContainer.appendChild(githubUrl);
footerContainer.appendChild(versionLabel);
footerContainer.appendChild(githubContainer);
contentContainer.appendChild(footerContainer);

closeButton.addEventListener('click', () => {
    document.body.removeChild(uiElement);
    autoAnswer = false;
    showAnswers = false;
});

let isMinimized = false;

minimizeButton.addEventListener('click', () => {
    isMinimized = !isMinimized;

    if (isMinimized) {
        contentContainer.style.display = 'none';
        uiElement.style.height = '50px';
        handle.style.height = '50px';
        closeButton.style.height = '30px';
        minimizeButton.style.height = '30px';
    } else {
        contentContainer.style.display = 'block';
        handle.style.height = '50px';
        uiElement.style.height = 'auto';
        closeButton.style.height = '30px';
        minimizeButton.style.height = '30px';
    }
});

function parseQuestions(questionsJson){
    let questions = []
    questionsJson.forEach(function (question){
    let q = {type:question.type, time:question.time}
    if (['quiz', 'multiple_select_quiz'].includes(question.type)){
        var i=0
        q.answers = []
        q.incorrectAnswers = []
        question.choices.forEach(function(choise){
            if (choise.correct) {
                q.answers.push(i)
            }
            else{
                q.incorrectAnswers.push(i)
            }
            i++
        })
    }
    if (question.type == 'open_ended')
    {
        q.answers = []
        question.choices.forEach(function(choise){
            q.answers.push(choise.answer)
        })
    }
    questions.push(q)
})
    return questions
}

function handleInputChange() {
    const quizID = inputBox.value;
    const url = 'https://kahoot.it/rest/kahoots/' + quizID;

    if (quizID != "") {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('');
                }
                return response.json();
            })
            .then(data => {
                inputBox.style.backgroundColor = 'green'

                questions=parseQuestions(data.questions)
                info.numQuestions=questions.length
            })
            .catch(error => {
                inputBox.style.backgroundColor = 'red';

                info.numQuestions = 0
            });
    } else {
        inputBox.style.backgroundColor = 'white';
        info.numQuestions = 0

    }
}

inputBox.addEventListener('input', handleInputChange);

document.body.appendChild(uiElement);

let isDragging = false;
let offsetX, offsetY;

handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - uiElement.getBoundingClientRect().left;
    offsetY = e.clientY - uiElement.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        uiElement.style.left = x + 'px';
        uiElement.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});


function onQuestionStart(){
    console.log(inputLag)
    var question = questions[info.questionNum]
    if (showAnswers){
        highlightAnswers(question)
    }
    if (autoAnswer){
        answer(question, (question.time - question.time / (500/(PPT-500))) - inputLag)
    }
}

function highlightAnswers(question){
    question.answers.forEach(function (answer) {
        setTimeout(function() {
            FindByAttributeValue("data-functional-selector", 'answer-'+answer, "button").style.backgroundColor = 'rgb(0, 255, 0)'
        }, 0)
    })
    question.incorrectAnswers.forEach(function (answer) {
        setTimeout(function() {
            FindByAttributeValue("data-functional-selector", 'answer-'+answer, "button").style.backgroundColor = 'rgb(255, 0, 0)'
        }, 0)
    })
}

function answer(question, time) {
    Answered_PPT = PPT
    
    var delay = 0
    if (question.type == 'multiple_select_quiz') delay = 60
    setTimeout(function() {
        if (question.type == 'quiz') {
            const key=(+question.answers[0]+1).toString();
            const event = new KeyboardEvent('keydown', { key });
            window.dispatchEvent(event);
        }
        if (question.type == 'multiple_select_quiz') {
            question.answers.forEach(function (answer) {
                setTimeout(function() {
                    const key=(+answer+1).toString();
                    const event = new KeyboardEvent('keydown', { key });
                    window.dispatchEvent(event);
                        }, 0)
                    })
            setTimeout(function() {
               FindByAttributeValue("data-functional-selector", 'multi-select-submit-button', "button").click()
            }, 0)
        }
    }, time - delay)
}

let isHidden = false;
document.addEventListener('keydown', (event)=> {
    if (event.key == "h"  && event.altKey)
    {
        isHidden = !isHidden
    }

    if (event.key == "x" && event.altKey){
        document.body.removeChild(uiElement);
        autoAnswer = false;
        showAnswers = false;
    }

    if (isHidden)
    {
        uiElement.style.display = 'none'
    }
    else
    {
        uiElement.style.display = 'block'
    }
})

setInterval(function () {
    var textElement = FindByAttributeValue("data-functional-selector", "question-index-counter", "div")
    if (textElement){
        
        info.questionNum = +textElement.textContent - 1
    }
    if (FindByAttributeValue("data-functional-selector", 'answer-0', "button") && info.lastAnsweredQuestion != info.questionNum) 
    {
        info.lastAnsweredQuestion = info.questionNun
        onQuestionStart()
    }
    if (autoAnswer){
        if (info.ILSetQuestion != info.questionNum){
            var ppt = Answered_PPT
            if (ppt > 987) ppt = 1000
            var incrementElement = FindByAttributeValue("data-functional-selector", "score-increment", "span")
            if (incrementElement){
                info.ILSetQuestion = info.questionNum
                var increment = +incrementElement.textContent.split(" ")[1]
                if (increment != 0){
                    inputLag += (ppt-increment)*15
                    if (inputLag < 0) {
                        inputLag -= (ppt-increment)*15
                        inputLag += (ppt-increment/2)*15
                    }
                    inputLag = Math.round(inputLag)
                }
            }
        }
    }
    questionsLabel.textContent = 'Question '+(info.questionNum+1)+' / '+info.numQuestions;
    inputLagLabel.textContent = 'Input lag : '+inputLag+' ms';
}, 1)