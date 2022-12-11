let email = document.getElementById("#emailRecovery")
const emailMustCharacter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passMustCharacter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
let accessNum = null

btn1.addEventListener("click", function () {   
    let popup = document.getElementById("myPopup");
    if(email.value.length === 0){
        popup.innerHTML = "Email input is empty"
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },2000)
      
}
else if(!email.value.match(emailMustCharacter)){
    // let popup = document.getElementById("myPopup2");
    popup.innerHTML = "Email syntax is wrong"
    popup.classList.toggle("show");
    setTimeout(function(){
        popup.classList.remove("show")
    },2000)
}
    else{
        let userData = {email: email.value}
        $.post("/ciroc/userpassword", (userData),        
            function (result) {
                if(result === false){
                    popup.innerHTML = "Email does not exist"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                }
                else{
                    accessNum = result;
                    alert("Acess code is " + result)
                    } 
            })
            
    }
    
})


btn2.addEventListener("click", function(){
    let popup = document.getElementById("myPopup2");
    let accessCode = document.getElementById("#accessCode")
    let newPass = document.getElementById("#newPass")
    let confirmNewPass = document.getElementById("#confirmNewPass")
    if(accessNum === null){
        popup.innerHTML = "Enter your email first and get access code to change password"
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },3000)
    }
    else if(accessCode.value.length === 0){
        popup.innerHTML = "Enter access code"
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },3000)
    }
    else if(accessCode.value.length === 0 || newPass.value.length === 0 || confirmNewPass.value.length === 0){
        popup.innerHTML = "Some fields are empty"
        popup.classList.toggle("show");
        setTimeout(function(){
            popup.classList.remove("show")
        },3000)
    }
    else if(parseInt(accessCode.value) == accessNum){
        if (newPass.value.match(passMustCharacter)){
            if(newPass.value === confirmNewPass.value){
                let userData = {
                    email: email.value,
                    password: newPass.value
                }
                $.ajax({
                    url: '/ciroc/userpassword',
                    method: 'PUT',
                    data: userData,
                    dataType: 'json',  
                    success: function (result) {
                        if(result === "samepassword"){
                            popup.innerHTML = "Cannot use the previous password"
                            popup.classList.toggle("show");
                            setTimeout(function(){
                                popup.classList.remove("show")
                            },2000)
                        }
                        else if(result){
                            popup.innerHTML = "Paasword succsefully changed"
                            popup.classList.toggle("show");
                            setTimeout(function(){
                                popup.classList.remove("show")
                            },2000)
                        }
                        else{
                            popup.innerHTML = "Error"
                            popup.classList.toggle("show");
                            setTimeout(function(){
                                popup.classList.remove("show")
                            },2000)
                        }
                    }
                });
            }
            else{
                popup.innerHTML = "New password and confirm password don't match"
                            popup.classList.toggle("show");
                            setTimeout(function(){
                                popup.classList.remove("show")
                            },2000)
            }
        }
        else{
            popup.innerHTML = "Password syntax is wrong"
                            popup.classList.toggle("show");
                            setTimeout(function(){
                                popup.classList.remove("show")
                            },2000)
        }
    }
    else if(parseInt(accessCode.value) != accessNum && accessCode.value.length != 0){
        popup.innerHTML = "Access code incorrect"
                            popup.classList.toggle("show");
                            setTimeout(function(){
                                popup.classList.remove("show")
                            },2000)
    }
})