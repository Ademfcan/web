var PasswordSignIn;
var UsernameSignIn;
var NewPassword;
var NewUsername;
var NewPasswordComfirmation;

const Screens = Object.freeze({
    START: 'START',
    LOGIN: 'LOGIN',
    ARCADE: 'Arcade',
    ARENA: 'ARENA'

})
function ChangeScreen(screen){
    if(screen === Screens.START){
        window.location.href = "StartScreen.html";
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

document.addEventListener('DOMContentLoaded', function() {
    
    
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
    PasswordSignIn = document.getElementById("username");
    UsernameSignIn = document.getElementById("password");
    NewPassword = document.getElementById("newPassword");
    NewUsername = document.getElementById("newUsername");
    NewPasswordComfirmation = document.getElementById("newPasswordValidated");


    
    
    
    
});
function changetoSignUp(){
    signUpScreen.classList.toggle('hidden');
    LoginScreen.classList.toggle('hidden');
    NewPassword.value = '';
    NewPasswordComfirmation.value = '';
    NewUsername.value = '';
}
var Storage = [];
async function validateUser(User, Pass) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "validateUser.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;
                    resolve(response === "true");
                } else {
                    console.error("Request failed:", xhr.status, xhr.statusText);
                    resolve(false);
                }
            }
        };

        var data = "User=" + encodeURIComponent(User) + "&Pass=" + encodeURIComponent(Pass);
        xhr.send(data);
    });
}

// Example usage with async/await




function addUser(User, Pass) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "database.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error("Request failed:", xhr.status, xhr.statusText);
            }
        }
    };

    var data = "User=" + encodeURIComponent(User) + "&Pass=" + encodeURIComponent(Pass);
    xhr.send(data);
}




function signInAttempt(){
    if(PasswordSignIn.value ==""){
        PasswordSignIn.classList.add('blinking');
        PasswordSignIn.classList.add('red');

        // Remove the blinking class after the animation is done
        setTimeout(function() {
            PasswordSignIn.classList.remove('blinking');
        }, 900); 
        PasswordSignIn.placeholder = "Please enter your password";
    }
    if(UsernameSignIn.value ==""){
        UsernameSignIn.classList.add('blinking');
        UsernameSignIn.classList.add('red');

        // Remove the blinking class after the animation is done
        setTimeout(function() {
            UsernameSignIn.classList.remove('blinking');
        }, 900); 
        UsernameSignIn.placeholder = "Please enter your username";
    }
    if(UsernameSignIn.value !="" && PasswordSignIn.value != ""){
        (async function() {
            var isValid = await validateUser(UsernameSignIn.value, PasswordSignIn.value);
            // Here you can use the value of isValid as needed
            if(isValid){
                // if sign in works
                UsernameSignIn.classList.remove('red');
                PasswordSignIn.classList.remove('red');
                console.log("logging in");
                sessionStorage.setItem('isLoggedIn','true');
                sessionStorage.setItem('user', UsernameSignIn.value);
    
                ChangeScreen(Screens.ARENA);
            }
            else{
                PasswordSignIn.classList.add('blinking');
                PasswordSignIn.classList.add('red');
    
                // Remove the blinking class after the animation is done
                setTimeout(function() {
                    PasswordSignIn.classList.remove('blinking');
                }, 900); 
                UsernameSignIn.classList.add('blinking');
                UsernameSignIn.classList.add('red');
    
                // Remove the blinking class after the animation is done
                setTimeout(function() {
                    UsernameSignIn.classList.remove('blinking');
                }, 900); 
    
            }
        })();
        

    }
   
}

function createNewUser(){
    //console.log("Username: " + NewUsername.value + "\nPassword: " + NewPassword.value + "\nPassword Confirmation: " + NewPasswordComfirmation.value)
    //console.log(NewPassword.value != NewPasswordComfirmation.value);
    
   
    // checking if password is empty
    if(NewPassword.value == ""){
        NewPassword.classList.add('blinking');
        NewPassword.classList.add('red');

        // Remove the blinking class after the animation is done
        setTimeout(function() {
            NewPassword.classList.remove('blinking');
        }, 900);        
         NewPassword.placeholder = "Please enter a password";
         NewPasswordComfirmation.classList.remove('red');
         NewPasswordComfirmation.placeholder = "Ex: seattleRocks2011!";




    }
     //checking pasword match
    else if(NewPassword.value != NewPasswordComfirmation.value){
        NewPasswordComfirmation.classList.add('blinking');
        NewPasswordComfirmation.classList.add('red');

        // Remove the blinking class after the animation is done
        setTimeout(function() {
            NewPasswordComfirmation.classList.remove('blinking');
        }, 900);         
        NewPasswordComfirmation.classList.add('red');
        NewPasswordComfirmation.placeholder = "Make sure passwords match";
    }
    else{
        NewPassword.classList.remove('red');
        NewPassword.placeholder = "Ex: seattleRocks2011!";
        NewPasswordComfirmation.classList.remove('red');
        NewPasswordComfirmation.placeholder = "Ex: seattleRocks2011!";
    }
    // checking if username is empty
    if(NewUsername.value == ""){
        NewUsername.classList.add('blinking');
        NewUsername.classList.add('red');

        // Remove the blinking class after the animation is done
        setTimeout(function() {
            NewUsername.classList.remove('blinking');
        }, 900);        
        NewUsername.placeholder = "Please enter a username";


    }
    else{
        NewUsername.classList.remove('red');
        NewUsername.placeholder = "Ex: ILoveSeattle@Gmail.com";
    }
   // if all good then add user
    if(NewPassword.value == NewPasswordComfirmation.value && NewPassword.value != "" && NewUsername.value != ""){
        addUser(NewUsername.value,NewPassword.value);
        
        console.log("Adding User");
        
        changetoSignUp();
        
    }
   
    
    

}