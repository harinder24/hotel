let email = document.getElementById("#email")
const emailMustCharacter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
$.ajax({
    url: '/ciroc/manager',
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
        let mName = document.getElementById("#mName")
        let mEmail = document.getElementById("#mEmail")
        let managerInfo = JSON.parse(sessionStorage.getItem('employee'))
        mName.innerHTML = managerInfo.name
        mEmail.innerHTML = managerInfo.email
    }
});
btn1.addEventListener("click", function () { 

    let popup = document.getElementById("myPopup1");
 
    if(email.value.length === 0){
        popup.innerHTML = "Email input is empty"
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

        $.ajax({
            url: '/ciroc/manager/fireemployee',
            method: 'DELETE',
            data: {email: email.value},
            dataType: 'json',        
            success: function (result) {
                if(result === false){
                    popup.innerHTML = "Email does not exist"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
     
                }
                else if(result === true){
                    popup.innerHTML = "Employee successfully fired"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                   
                    } 

                else if(result === "manager"){
                    popup.innerHTML = "Can't fire manager"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                   
                }
                }
            });
    }
    
})
let table = document.createElement('table')
let outputTable = document.getElementById('#outputTable')
btn2.addEventListener("click", function () {   
    let popup = document.getElementById("myPopup3");

    
    $.ajax({
        url: '/ciroc/manager/employeelist',
        method: 'GET',
        dataType: 'json',        
        success: function (result) {
            if(result === false){
                popup.innerHTML = "ERROR"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                   
            }
            else{

                let tr
                let td
                
                table.innerHTML = ""

                for (let i = 0; i < result.length; i++) {
            
                tr = table.appendChild(document.createElement('tr'));
                if(i === 0){
                    for(let k = 0; k < 3; k++){
                        td = tr.appendChild(document.createElement('td'));
                        if(k === 0){
                            td.innerHTML = "Name";
                        }
                        if(k === 1){
                            td.innerHTML = "Email";
                        }
                        if(k === 2){
                            td.innerHTML = "Role"
                        }
                        td.classList.add('border')
                        td.classList.add('bold')
                        td.classList.add('table-header')
                    }
                    tr = table.appendChild(document.createElement('tr'));
                }
                
                for(let j = 0; j < Object.keys(result[i]).length; j++){
                    td = tr.appendChild(document.createElement('td'));
                    td.innerHTML = Object.values(result[i])[j];
                    td.classList.add('border')
                    td.classList.add('table-row')
                }
            
                }
                table.classList.add('clear')
                outputTable.appendChild(table);
                        } 
                    }
                });
            
                
    
})

btn3.addEventListener("click", function () {
    const emailMustCharacter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let hname = document.getElementById("#hname")
    let hemail = document.getElementById("#hemail")
    let popup = document.getElementById("myPopup2");


    if(hname.value.length == 0 || hemail.value.length == 0){

        popup.innerHTML = "Some fields are empty."
            popup.classList.toggle("show");
            setTimeout(function(){
                popup.classList.remove("show")
            },2000)
    }
    else{
        
        if(!hemail.value.match(emailMustCharacter)){
            popup.innerHTML = "Email syntax is wrong."
            popup.classList.toggle("show");
            setTimeout(function(){
                popup.classList.remove("show")
            },2000)
        
        }
        
        else{
            let employeeData = {
                name: hname.value,
                email: hemail.value,
                role: "employee",
                password: (Math.random()*1000000).toFixed(0)
            }
            console.log(employeeData);
            $.post("/ciroc/manager/employeeregistration", (employeeData),
                function(request) {
                if(request == "exist"){
                    popup.innerHTML = "Employee already exist on this email"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
                    
                }
                else if (true){
                    popup.innerHTML = "Employee added"
                    popup.classList.toggle("show");
                    setTimeout(function(){
                        popup.classList.remove("show")
                    },2000)
               
                } 
            });
        }
    }

    

})

btn4.addEventListener("click", function (){
    sessionStorage.setItem("employeeAccessToken",JSON.stringify([]) )
    sessionStorage.setItem("employee",JSON.stringify([]) )
    location.href = "/ciroc"

})
let bookingInfo = [];
btn5.addEventListener("click", function (){

    location.href = "/ciroc/employeepassword"

})

let outputTable2 = document.getElementById('#outputTable2')
const userBooking = () => {
    $.ajax({
        url: '/ciroc/manager/bookinglist',
        method: 'GET',
        dataType: 'json',        
        success: function (result) {
            bookingInfo = result;

                let tr
                let td
                
                table.innerHTML = ""

                for (let i = 0; i < result.length; i++) {
            
                tr = table.appendChild(document.createElement('tr'));
                if(i === 0){
                    for(let k = 0; k < 3; k++){
                        td = tr.appendChild(document.createElement('td'));
                        if(k === 0){
                            td.innerHTML = "Name";
                        }
                        if(k === 1){
                            td.innerHTML = "Email";
                        }
                        if(k === 2){
                            td.innerHTML = "Room"
                        }
                        
                        td.classList.add('border')
                        td.classList.add('bold')
                        td.classList.add('table-header')
                    }
                    tr = table.appendChild(document.createElement('tr'));
                }
                
                for(let j = 0; j < 4; j++){
                    if(j == 3){
 
                        td = tr.appendChild(document.createElement('tr'))
                        let but = document.createElement("button")
                        but.innerHTML = "UNBOOK!"
                        but.setAttribute("id",`${i}`)
                        but.setAttribute("class",`btn2`)
                        
                        td.appendChild(but)
                    }
                    else{
                    td = tr.appendChild(document.createElement('td'));
                    td.innerHTML = Object.values(result[i])[j];
                    td.classList.add('border')
                    td.classList.add('table-row')
                }}
            
                }
                table.classList.add('clear')
                outputTable2.appendChild(table);
                        } 
                    
                });
}

btn6.addEventListener("click", userBooking)

outputTable2.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === "BUTTON"
    if(isButton){
        let data = event.target.id;
        $.ajax({
            url: "/ciroc/manager/unbook",
            method: 'PUT',
            
            data: bookingInfo[data],
            dataType: "json",
             
            success: function (request) {

            if(request === true){
                userBooking();
            }
            
        }
        
    });
    }
})
