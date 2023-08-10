

function setLoggedIn(bool){
    sessionStorage.setItem('isLoggedIn', bool);
}

function getLoggedIn(){
    if(sessionStorage.getItem('isLoggedIn') != undefined){
        return sessionStorage.getItem('isLoggedIn');
    }
    return false;
    
}