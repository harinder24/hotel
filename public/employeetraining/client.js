
$.ajax({
    url: '/ciroc/employee/training',
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
    }
});