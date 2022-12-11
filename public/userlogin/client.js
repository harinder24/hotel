let email = document.getElementById("#email");
let password = document.getElementById("#password");
let userData;
const emailMustCharacter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

btn.addEventListener("click", function(event){

    event.preventDefault();
    let popup = document.getElementById("myPopup");
    if(email.value.length == 0 || password.value.length == 0){
        popup.innerHTML = "Some fields are empty."
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },2000)
        
    }
    else if(!email.value.match(emailMustCharacter)){
        popup.innerHTML = "Email syntax is wrong."
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },2000)
    }
    else{
        let userData = {
            email: email.value,
            password: password.value
        }
        let xhr = $.post("/ciroc/userlogin", (userData),
            function(request) {
                if(request.bool === true){
                    if(xhr.getResponseHeader("auth-token") != undefined){
                        sessionStorage.setItem("userAccessToken",JSON.stringify(xhr.getResponseHeader("auth-token")) )
                        sessionStorage.setItem("user",JSON.stringify(request.data) )
                        location.href = "/ciroc/user/"
                    }
                }
                else if(request === "incorrect"){
                    popup.innerHTML = "Incorrect password"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                }
                else if (request === false){
                    popup.innerHTML = "User does not exist, please register"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                }
        });

    }

    
})