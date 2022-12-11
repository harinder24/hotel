
let UserName = document.getElementById("#name");
let email = document.getElementById("#email");
let password = document.getElementById("#password");
let cpassword = document.getElementById("#cpassword");
let validation = true;
const passMustCharacter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
btn.addEventListener("click", function () {
    const emailMustCharacter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let text = ""
    let missingInfo = ""
    validation = true;
    let popup = document.getElementById("myPopup");

    if(UserName.value.length == 0 ||email.value.length == 0 || password.value.length == 0 || cpassword.value.length == 0 ){
        missingInfo = "Some fields are empty."
    }
  
    if(!email.value.match(emailMustCharacter)){
        text += "Email syntax is wrong.\n"
        validation = false
    }


    if (!password.value.match(passMustCharacter)){
        text += "Password syntax is wrong.\n"
        validation = false
    }
    if(cpassword.value != password.value ){
        text += "Password and confirm password does not match.\n"
        validation = false
    }
    if (validation === false){
        if(missingInfo === ""){
            popup.innerHTML = text
            popup.classList.toggle("show");
            setTimeout(function(){
                popup.classList.remove("show")
            },2000)
      
        }
        else{
            popup.innerHTML = missingInfo
            popup.classList.toggle("show");
            setTimeout(function(){
                popup.classList.remove("show")
            },2000)
        }
    }
    else{
        let userData = {
            name: UserName.value,
            email: email.value,
            role: "user",
            password: password.value
        }
        $.post("/ciroc/userregistration", (userData),
            function(request) {
            if(request == "exist"){
                popup.innerHTML = "User already exist on this email"
                popup.classList.toggle("show");
                setTimeout(function(){
                    popup.classList.remove("show")
                },2000)
               
            }
            else if (true){
                popup.innerHTML = "User added"
                popup.classList.toggle("show");
                setTimeout(function(){
                    popup.classList.remove("show")
                },2000)
                location.href = "/ciroc/userlogin"
            } 
        });

    } 


})


