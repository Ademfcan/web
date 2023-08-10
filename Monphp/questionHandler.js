var questionDisplayer;
var questionInput;
var ansButton;
var QuestionContainer;
var QuestionsLogIn;
var loginReminder;
var RightLBL;
var WrongLBL;
var ArenaInfoLabel;




function hideElementsOnLogin() {
    // components only shown when logged in
    questionDisplayer.classList.remove('hidden');
    questionInput.classList.remove('hidden');
    ansButton.classList.remove('hidden');
    ArenaInfoLabel.classList.remove('hidden');
    ansButton.disabled = false;
    // components only shown when not logged in

    QuestionsLogIn.disabled = true;
    QuestionsLogIn.classList.add('hidden');
    loginReminder.classList.add('hidden');
    timercontainer.classList.add('hidden');

    questionInput.focus();
}

function hideElementsOnLogout() {
    // components only shown when not logged in
    
    questionDisplayer.classList.add('hidden');
    questionInput.classList.add('hidden');
    ansButton.classList.add('hidden');
    timercontainer.classList.add('hidden');
    ArenaInfoLabel.classList.add('hidden');
    ansButton.disabled = true;

    // components only shown when logged in

    QuestionsLogIn.disabled = false;
    QuestionsLogIn.classList.remove('hidden');
    loginReminder.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    questionDisplayer = document.getElementById('questionDisplayer');
    questionInput = document.getElementById('questionInput');
    ansButton = document.getElementById('ansButton');
    QuestionContainer = document.getElementById('QuestionContainer');
    QuestionsLogIn = document.getElementById('QuestionsLogIn');
    loginReminder = document.getElementById('loginReminder');
    RightLBL = document.getElementById('RightLBL');
    WrongLBL = document.getElementById('WrongLBL');
    timerBar = document.getElementById('timer');
    timercontainer = document.getElementById('timer-container');
    ArenaInfoLabel = document.getElementById('ArenaInfoLabel');

    ansButton.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            answerQuestion();
        }
    });

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        hideElementsOnLogin();
        getQuestion();

    } else {
        hideElementsOnLogout();
    }
    
    
});





function getQuestion(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getQuestion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var questionData = JSON.parse(xhr.responseText);
                sessionStorage.setItem('currentQuestion', questionData.QUESTIONSTRING);
                sessionStorage.setItem('currentQuestionID', questionData.QUESTIONID);
                sessionStorage.setItem('currentQuestionANS', questionData.QUESTIONANS);
                sessionStorage.setItem('currentQuestionDIFF', questionData.DIFFICULTY);
                questionDisplayer.textContent = "Question: " + parseEquationWithSpaces(questionData.QUESTIONSTRING);
                ArenaInfoLabel.textContent = "Question value: " + questionData.DIFFICULTY + " points";

                //console.log(xhr.responseText);

            } else {
                console.error("Request failed:", xhr.status, xhr.statusText);
            }
        }
    };

    var data = "ID=" + getRandomInt(1,200);
    xhr.send(data);
}

function answerQuestion(){
    //console.log("USER ANS: " + questionInput.textContent + "Correct ANS: " + sessionStorage.getItem('currentQuestionANS'))
    if(questionInput.value != ""){
        if(questionInput.value == sessionStorage.getItem('currentQuestionANS')){
            //console.log("correct");
            setPoints(parseInt(sessionStorage.getItem('currentQuestionDIFF')));
            questionInput.value = "";
            questionInput.focus();
            RightLBL.textContent = "Correct +" + sessionStorage.getItem('currentQuestionDIFF') + " points";
            RightLBL.style.color = 'green';
            
            RightLBL.style.opacity = 1;
            setTimeout(function() {
                RightLBL.style.opacity = 0;
                
    
            }, 1500); 
            getQuestion();
        }
        else{
            questionInput.value = "";
            questionInput.focus();
            // no transition for resetting timer
            RightLBL.textContent = "Wrong";
            RightLBL.style.color = 'red';
            RightLBL.style.opacity = 1;
            setTimeout(function() {
                RightLBL.style.opacity = 0;
                
    
            }, 1500); 
            getQuestion();
        }
    }
    else{
        questionInput.classList.add('blinking');

        // Remove the blinking class after the animation is done
        setTimeout(function() {
            questionInput.classList.remove('blinking');
        }, 900); 
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseEquationWithSpaces(equation) {
    // Add spaces around operators (%, X, +, -)
    equation = equation.replace(/([%X+\-])/g, ' $1 ');

    // Remove any extra spaces
    equation = equation.replace(/\s+/g, ' ').trim();

    return equation;
}

