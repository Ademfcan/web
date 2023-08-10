const Screens = Object.freeze({
    START: 'START',
    LOGIN: 'LOGIN',
    ARCADE: 'ARCADE',
    ARENA: 'ARENA'

});


function ChangeScreen(screen){
    if(screen === Screens.START){
        window.location.href = "index.html";
    }
    else if(screen === Screens.LOGIN){
        window.location.href = "LoginScreen.html";
    }

    else if(screen === Screens.ARENA){
        window.location.href = "Arena.html";
    }

    else if(screen === Screens.ARCADE){
        window.location.href = "Arcade.html";
    }
    else{
        console.log("The screen " + screen  + " does not exist");
    }




}


function sout(text){
    console.log(text);
}

var signUpScreen;
var LoginScreen;

var infoPanel;
var currentProfileIcon;
var topLoginButton;
var welcomelabel;
var pointsDisplayer;


//boolean



document.addEventListener('DOMContentLoaded', function() {
    console.log(sessionStorage.getItem('isLoggedIn'));
    topLoginButton = document.getElementById("topLoginButton");
    welcomelabel = document.getElementById("welcomelabel");
    pointsDisplayer = document.getElementById("pointsDisplayer");

   
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        // User is logged in
        topLoginButton.classList.add('hidden');
        topLoginButton.disabled = true;
    
        welcomelabel.classList.remove('hidden');
        welcomelabel.textContent = "Welcome " + sessionStorage.getItem('user');

        pointsDisplayer.classList.remove('hidden');
        getPoints(sessionStorage.getItem('user'));
        console.log("Login hidden");
    } 
    else {
        // User is not logged in
        topLoginButton.classList.remove('hidden');
        topLoginButton.disabled = false;
    
        welcomelabel.classList.add('hidden');
        pointsDisplayer.classList.add('hidden');
        console.log("Login shown");
    }
    
    const toggleButton = document.getElementById('toggleButton');
    const popup = document.getElementById('popup');

    toggleButton.addEventListener('click', function() {
        popup.classList.toggle('expanded');
        if(toggleButton.textContent === "▥"){
            toggleButton.textContent = "▢";
        }
        else if(toggleButton.textContent === "▢"){
            toggleButton.textContent = "▥";
        }
        console.log("clicked");
    });
   
    signUpScreen = document.getElementById("signUp");
    LoginScreen = document.getElementById("Login");
    infoPanel = document.getElementById("info");
    currentProfileIcon = document.getElementById("currentProfileIcon");


    infoPanel.addEventListener('mouseenter', function(){
        //console.log("over infoPanel")
        infoPanel.classList.add('expanded');
    })
    currentProfileIcon.addEventListener('mouseenter', function(){
        //console.log("over userButton")
        infoPanel.classList.add('expanded');
    })
    infoPanel.addEventListener('mouseleave', function(){
        infoPanel.classList.remove('expanded');
    })
    currentProfileIcon.addEventListener('mouseleave', function(){
        infoPanel.classList.remove('expanded');
    })
    
    
    
});


var Icons =["Resources/ProfileIcons/actress.png","Resources/ProfileIcons/artist.png","Resources/ProfileIcons/barista.png","Resources/ProfileIcons/business-man.png","Resources/ProfileIcons/businessman.png",
            "Resources/ProfileIcons/chef.png","Resources/ProfileIcons/customer-service.png","Resources/ProfileIcons/dancer.png","Resources/ProfileIcons/diver.png","Resources/ProfileIcons/doctor.png",
            "Resources/ProfileIcons/farmer.png","Resources/ProfileIcons/guard.png","Resources/ProfileIcons/judge.png","Resources/ProfileIcons/magician.png","Resources/ProfileIcons/postman.png",
            "Resources/ProfileIcons/professor.png","Resources/ProfileIcons/soldier.png","Resources/ProfileIcons/sportsman.png","Resources/ProfileIcons/magician.png","Resources/ProfileIcons/teacher.png"];

function changeProfileIconTest(){
    var randInt = getRandomInt(0,Icons.length-1);
    //console.log(Icons[randInt]);
    currentProfileIcon.src = Icons[randInt];
}

function logOut(){
    sessionStorage.setItem('isLoggedIn','false');
    console.log("Logging out");
    ChangeScreen(Screens.START);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPoints(amount){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "setPoints.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //console.log(xhr.responseText);
                getPoints(sessionStorage.getItem('user'));
            } else {
                console.error("Request failed:", xhr.status, xhr.statusText);
            }
        }
    };

    var data = "User=" + encodeURIComponent(sessionStorage.getItem('user')) + "&Amount=" + amount;
    xhr.send(data);
    

}

function getPoints(username) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getPoints.php", true); // Replace with the actual PHP script URL
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = xhr.responseText;
                console.log(response);
                document.getElementById("pointsDisplayer").innerHTML = "Points: " + response;
            } else {
                console.error("Request failed:", xhr.status, xhr.statusText);
            }
        }
    };

    var data = "Name=" + encodeURIComponent(username);
    xhr.send(data);
}









