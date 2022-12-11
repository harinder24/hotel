
$.ajax({
    url: '/ciroc/employee',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('employeeAccessToken'))}`
    }, 
    success: function (result) {

        if(result === false){
            alert("Access Denied")
            location.href = "/ciroc"
        }
        let eName = document.getElementById("#eName")
        let eEmail = document.getElementById("#eEmail")
        let employeeInfo = JSON.parse(sessionStorage.getItem('employee'))
        eName.innerHTML = employeeInfo.name
        eEmail.innerHTML = employeeInfo.email
    }

});
btn4.addEventListener("click", function (){
    sessionStorage.setItem("employeeAccessToken",JSON.stringify([]) )
    sessionStorage.setItem("employee",JSON.stringify([]) )
    location.href = "/ciroc"

})
btn5.addEventListener("click", function (){

    location.href = "/ciroc/employeepassword"

})