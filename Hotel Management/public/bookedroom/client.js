$.ajax({
    url: "/ciroc/user/bookedroom",
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userAccessToken'))}`
    }, 
    success: function (result) {

        if(result === false){
            alert("Access Denied")
            location.href = "/ciroc"
        }
        else{
  
            let output = document.getElementById("output")
            $.ajax({
                url: '/ciroc/user/bookedroom/getroom',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userAccessToken'))}`
                },
                success: function (req) {
                    for (let index = 0; index < req.length; index++) {
                        
                        let link = req[index].link
                      
                        let num = req[index].num
                        let img = document.createElement("img")
                        img.src = `${link}`
                        output.appendChild(img)
                        let br = document.createElement("hr")
                        output.appendChild(br)
                        let p = document.createElement("p")
                        p.innerHTML = `Room No. ${num} is available for booking`
                        output.appendChild(p)
                        output.appendChild(br)
                        let but = document.createElement("button")
                        but.setAttribute("id",`${num}`)
                        but.setAttribute("class",`but`)
                        but.innerHTML = "UNBOOK!"
                        output.appendChild(but)
                        output.appendChild(br)
                    }
                }
            })
        }
    }
});

let bubble = document.getElementById("output")

bubble.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === "BUTTON"
    if(isButton){
        let data = event.target.id;
        $.ajax({
            url: "/ciroc/user/unbook",
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('userAccessToken'))}`,
                'data' : data
            },
             
            success: function (request) {

            if(request === true){
                location.href = "/ciroc/user/bookedrooms"
            }
            
        }
        
    });
    }
})