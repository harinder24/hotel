let email = document.getElementById("#email");
let password = document.getElementById("#password");

const emailMustCharacter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
btn.addEventListener("click", function(event){
    let popup = document.getElementById("myPopup");
    event.preventDefault();
    if(email.value.length == 0 || password.value.length == 0){
        popup.innerHTML = "Some fields are empty"
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },2000)
    }
    else if(!email.value.match(emailMustCharacter)){
        popup.innerHTML = "Email syntax is wrong"
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },2000)
    }
    else{
        let employeeData = {
            email: email.value,
            password: password.value
        }
        
        let xhr = $.post("/ciroc/employeelogin", (employeeData),
            function(result) {
                if(result === false){
                    popup.innerHTML = "Email does not exist"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                }
                else if(result === "incorrect"){
                    popup.innerHTML = "Wrong Password"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                }
                else if (result.bool === true){
                    if(xhr.getResponseHeader("auth-token") != undefined){
                        sessionStorage.setItem("employeeAccessToken",JSON.stringify(xhr.getResponseHeader("auth-token")) )
                        sessionStorage.setItem("employee",JSON.stringify(result.data) )
                        if(result.data.role === "employee"){
                            location.href = "/ciroc/employee/"
                        }
                        else if(result.data.role === "manager"){
                            location.href = "/ciroc/manager/"
                        }
                    }
                 } 
                
        });
    }
   
})