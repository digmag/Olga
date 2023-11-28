function ConvertDate(){
    let Date = document.querySelector("#Date").value;
    return (Date+"T00:00:00.000Z");
}
document.addEventListener("click", (e)=>{
    if(e.target.id =="Male" || e.target.id == "Female"){
        document.querySelector("#Gender").value = e.target.textContent;
    }
});
document.querySelector("#Reg").addEventListener("click", () => {
    let Gender;
    if(document.querySelector("#Gender").value =='Мужской'){
        Gender = 'Male';
    }
    else{
        Gender = 'Female';
    }
    let body = {
        "fullName": document.querySelector("#Name").value,
        "password": document.querySelector("#password").value,
        "email": document.querySelector("#email").value,
        "birthDate": ConvertDate(),
        "gender": Gender,
        "phoneNumber": document.querySelector("#Phone").value
    };
    console.log(body);
    try{
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: 'https://blog.kreosoft.space/api/account/register',         /* Куда отправить запрос */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: JSON.stringify(body),     /* Данные передаваемые в массиве */
            success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
                    localStorage.setItem("token", data["token"]);/* В переменной data содержится ответ от index.php. */
                    console.log(localStorage);
                    after_reg();
                }
        
        });
    }
    catch(err){
        alert(err);
    }
});
/*{
  "fullName": "string",
  "password": "string",
  "email": "user@example.com",
  "birthDate": "2023-11-21T13:01:30.617Z",
  "gender": "Male",
  "phoneNumber": "string"
}*/
function after_reg(){
    let LoginButton = document.querySelector("#btn");
    let profilebtn = document.querySelector("#profilebtn");
    if(window.localStorage.token){
        LoginButton.style.display = "none";
        profilebtn.style.display = "";
    }
}
document.querySelector("#MainBtn").addEventListener("click",()=>{
    window.location.href = "https://frontendtest";
});