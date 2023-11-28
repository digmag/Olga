let AuthBtn = document.getElementById("AuthBtn");
let RegBtn = document.getElementById("Reg");
let MainBtn = document.getElementById("MainBtn");
console.log(document.getElementById("MainBtn"));
let emailField = document.getElementById("email");
let passField = document.getElementById("password");
AuthBtn.onclick = function(){
    let mp= {"email": emailField.value, "password": passField.value};
    try{
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: 'https://blog.kreosoft.space/api/account/login',         /* Куда отправить запрос */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: JSON.stringify(mp),     /* Данные передаваемые в массиве */
            success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
                    localStorage.setItem("token", data["token"]);/* В переменной data содержится ответ от index.php. */
                    console.log(localStorage);
                    after_log();
                }
        
        });
    }
    catch(err){
        alert(err);
    }
};
RegBtn.onclick = function (){
    window.location.href = "https://frontendtest/registration/";
};
MainBtn.onclick = function(){
    window.location.href = "https://frontendtest/";
};
function after_log(){
    let LoginButton = document.querySelector("#btn");
    let profilebtn = document.querySelector("#profilebtn");
    if(window.localStorage.token){
        LoginButton.style.display = "none";
        profilebtn.style.display = "";
    }
}
