$.ajax({
    url: '/ciroc/user',
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
          let uName = document.getElementById("#uName")
          let userInfo = JSON.parse(sessionStorage.getItem('user'))
          uName.innerHTML = userInfo.name
        }
    }
});
logout.addEventListener("click", function (){
  sessionStorage.setItem("userAccessToken",JSON.stringify([]) )
  sessionStorage.setItem("user",JSON.stringify([]) )
  location.href = "/ciroc"

})

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}