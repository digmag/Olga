let AuthBtn = document.getElementById("btn");
AuthBtn.onclick = function(){
    window.location.href = "https://frontendtest/login/";
};
let MainBtn = document.getElementById("MainBtn");
MainBtn.onclick = function(){
    window.location.href = "https://frontendtest/";
};
function putintoblox(data){
    let posts = data.posts;
    console.log(posts);
    let pagination = data.pagination;
    posts.forEach(e => {
        let clone = document.querySelector("#Post").cloneNode(true);
        clone.style.display = "";
        clone.id = "";
        clone.querySelector("#Title").textContent = e.title;
        clone.querySelector("#Title").href = "/post/"+e.id;
        clone.querySelector("#Description").textContent = e.description;
        clone.querySelector("#Name").textContent = e.author;
        clone.querySelector("#Date").textContent = parsetime(e.createTime);
        if(e.image != null){
            clone.querySelector("#Image").width = 255;
            clone.querySelector("#Image").height = 255;
            clone.querySelector("#Image").src = e.image;
        }
        document.querySelector("#Posts").appendChild(clone);
    });
    createPaginationBar(pagination);
}
function get_posts(url){
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,         /* Куда отправить запрос */
        dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            /* Данные передаваемые в массиве */
        success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
                /* В переменной data содержится ответ от index.php. */
                putintoblox(data);
            }
    
    });
};
function createPaginationBar(pagination){
    let f = 0;
    let PaginationBar = document.querySelector("#paginationBar");
    let clone = PaginationBar.querySelector(".page-item").cloneNode(true);
    clone.querySelector(".page-link").style.display = "";
    clone.querySelector(".page-link").textContent = "<<";
    clone.querySelector(".page-link").href = "?page="+(1);
    PaginationBar.appendChild(clone);
    for (let i=0;i<pagination.count;i++){
        let clonePaginator = PaginationBar.querySelector(".page-item").cloneNode(true);
        clonePaginator.querySelector(".page-link").style.display = "";
        clonePaginator.querySelector(".page-link").textContent = i+1;
        clonePaginator.querySelector(".page-link").href = "?page="+(i+1);
        if(window.location.search == "?page="+(i+1)){
            clonePaginator.className = "page-item active";
        }
        else if(window.location.search == "" && f == 0){
            clonePaginator.className = "page-item active";
            f=1;
        }
        PaginationBar.appendChild(clonePaginator);
    }
    let clonePaginator = PaginationBar.querySelector(".page-item").cloneNode(true);
    clonePaginator.querySelector(".page-link").style.display = "";
    clonePaginator.querySelector(".page-link").textContent = ">>";
    clonePaginator.querySelector(".page-link").href = "?page="+(pagination.count);
    PaginationBar.appendChild(clonePaginator);
}
window.addEventListener("load", ()=>{
    if(window.location.search != ""){
        get_posts('https://blog.kreosoft.space/api/post'+window.location.search);
    }
    else{
        get_posts('https://blog.kreosoft.space/api/post');
    }
});

function parsetime(timeformat){
    let datetime = timeformat.split("T");
    let YYMMDD = datetime[0].split("-");
    let HHMMSS = (datetime[1].split(".")[0]).split(":");
    let newdatetime = YYMMDD[2]+"."+YYMMDD[1]+"."+YYMMDD[0]+" "+HHMMSS[0]+":"+HHMMSS[1];
    return newdatetime;
}