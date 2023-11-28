let LoginButton = document.querySelector("#btn");
let profilebtn = document.querySelector("#profilebtn");
if(window.localStorage.token){
    LoginButton.style.display = "none";
    profilebtn.style.display = "";
}