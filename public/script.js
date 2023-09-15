
function opendis(){
  var x=document.getElementById("discriptionblock");

  if(x.style.display=="block"){
    document.getElementById("bubble").style.color="black";
    
  x.style.display="none";
  }
  else{
    document.getElementById("bubble").style.color="red";
    x.style.display="block";
  }
}


function openNav(){
 
  document.getElementById("mySidepanel").style.width = "60%";

  document.getElementById("mySidepanel").style.height = "100%";
  
}

function closeNav(){
  document.getElementById("mySidepanel").style.width = "0";
}

function changemode1(){
  var bk=document.body
  var hbcolor=document.getElementById("header");
  var y=document.getElementsByClassName("textmode");
  var ftclr=document.getElementById("footer");
  var sidepan=document.getElementsByClassName("sidepanel");
  var serial_color=document.getElementsByClassName("serial");
  var time_table_even=document.getElementsByClassName("timetable_even");
  // var bg_mock=document.getElementById("bg3");
  // var bg_writer=document.getElementById("bg4");
  console.log(time_table_even);
  
  if(localStorage.getItem("mode") == 'black'){
    for(var i=0;i<time_table_even.length;i++){
      time_table_even[i].style.backgroundColor="#303030";

    }
    hbcolor.style.backgroundColor="black";
    // bg_mock.style.backgroundImage= "url(\"images/background/mock_dark.png\")";
    // bg_writer.style.backgroundImage= "url(\"images/background/writer_dark.png\")";
    ftclr.style.backgroundColor="black";
    for(var i=0;i<serial_color.length;i++){
      serial_color[i].style.color="white";
     }
    // bk.style.backgroundImage="url(\"images/bbg2.png\")";
    bk.style.backgroundColor="#101010";
    bk.style.color="white";
    for(var i=0;i<y.length;i++){
      y[i].style.color="white";
  }
  for(var i=0;i<sidepan.length;i++){
    sidepan[i].style.backgroundColor="black";
  }
  // localStorage.setItem('mode','white');
}
else{
  for(var i=0;i<time_table_even.length;i++){
  time_table_even[i].style.backgroundColor="#DCDCDC";
  }
  hbcolor.style.backgroundColor="white";
  ftclr.style.backgroundColor="white";
  // bg_mock.style.backgroundImage= "url(\"images/background/mock.png\")";
  // bg_writer.style.backgroundImage= "url(\"images/background/writer.png\")";
  for(var i=0;i<serial_color.length;i++){
    serial_color[i].style.color="black";
   }
  // bk.style.backgroundImage="url(\"images/bbg1.png\")";
  bk.style.backgroundColor="#F5F5F5";
  bk.style.color="black";
  for(var i=0;i<y.length;i++){
      y[i].style.color="black";
  }
  for(var i=0;i<sidepan.length;i++){
    sidepan[i].style.backgroundColor="white";
  }
}
document.getElementById("loading").style.display = "none";
}
function changemod(){ 
  var bk=document.body;
  var hbcolor=document.getElementById("header");
  var y=document.getElementsByClassName("textmode");
  var ftclr=document.getElementById("footer");
  var sidepan=document.getElementsByClassName("sidepanel");
  var serial_color=document.getElementsByClassName("serial");
  var time_table_even=document.getElementsByClassName("timetable_even");
  // var bg_mock=document.getElementById("bg3");
  // var bg_writer=document.getElementById("bg4");
  console.log(serial_color);

 const val =  localStorage.getItem('mode');
 if(val) {
  // console.log("mode is " , localStorage.getItem("mode"));
  
    if(localStorage.getItem("mode") == 'black'){
      for(var i=0;i<time_table_even.length;i++){
      time_table_even[i].style.backgroundColor="#DCDCDC";
      }
      // bg_mock.style.backgroundImage= "url(\"images/background/mock.png\")";
      // bg_writer.style.backgroundImage= "url(\"images/background/writer.png\")";
      hbcolor.style.backgroundColor="white";
      ftclr.style.backgroundColor="white";
      // bk.style.backgroundImage="url(\"images/bbg1.png\")";
      bk.style.backgroundColor="#F5F5F5";
      bk.style.color="black";
      for(var i=0;i<serial_color.length;i++){
       serial_color[i].style.color="black";
      }
      for(var i=0;i<y.length;i++){
          y[i].style.color="black";
      }
      for(var i=0;i<sidepan.length;i++){
        sidepan[i].style.backgroundColor="white";
      }
       localStorage.setItem('mode','white');
    }
  
  else{
    for(var i=0;i<time_table_even.length;i++){
    time_table_even[i].style.backgroundColor="#303030";
    }
    hbcolor.style.backgroundColor="black";
    ftclr.style.backgroundColor="black"
    // bg_mock.style.backgroundImage= "url(\"images/background/mock_dark.png\")";
    // bg_writer.style.backgroundImage= "url(\"images/background/writer_dark.png\")";
    for(var i=0;i<serial_color.length;i++){
      serial_color[i].style.color="white";
     }
    // bk.style.backgroundImage="url(\"images/bbg2.png\")";
    bk.style.backgroundColor="#101010";
    bk.style.color="white";
    for(var i=0;i<y.length;i++){
      y[i].style.color="white";
  }
  for(var i=0;i<sidepan.length;i++){
    sidepan[i].style.backgroundColor="black";
  }
      localStorage.setItem('mode','black');
  }
  // localStorage.setItem("mode", localStorage.getItem("mode") === "white" ? "black" : "white");
  const currentMode = localStorage.getItem("mode");
  console.log({currentMode});
  
 }
 else {
   
  localStorage.setItem("mode","white");
  time_table_even.style.backgroundColor="#303030";
  hbcolor.style.backgroundColor="black";
  ftclr.style.backgroundColor="black";
  // bg_mock.style.backgroundImage= "url(\"images/background/mock_dark.png\")";
  // bg_writer.style.backgroundImage= "url(\"images/background/writer_dark.png\")";
  // bk.style.backgroundImage="url(\"images/bbg2.png\")";
  bk.style.backgroundColor="#101010";
  bk.style.color="white";
  for(var i=0;i<y.length;i++){
    y[i].style.color="white";
  }
  for(var i=0;i<sidepan.length;i++){
    sidepan[i].style.backgroundColor="black";
  }
  for(var i=0;i<serial_color.length;i++){
    serial_color[i].color="white";
   }
   localStorage.setItem('mode','black');
 }
}
// Slideshow images
const slidesContainer = document.querySelector(".slides");
let slideIndex = 0;
let transitioning = false; // Track if a transition is in progress

function showSlides() {
  if (!transitioning) {
    slideIndex++;
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

    if (slideIndex >= slidesContainer.children.length) {
      slideIndex = 0;
      slidesContainer.style.transition = "none";
      slidesContainer.style.transform = `translateX(0)`;
      setTimeout(() => {
        slidesContainer.style.transition = "";
      }, 10);
    }

    setTimeout(showSlides, 5000);
  }
}

function changeSlide(offset) {
  if (!transitioning) {
    slideIndex += offset;
    if (slideIndex < 0) {
      slideIndex = slidesContainer.children.length - 1;
    } else if (slideIndex >= slidesContainer.children.length) {
      slideIndex = 0;
    }
    transitioning = true; // Disable transition during manual change
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    setTimeout(() => {
      transitioning = false; // Re-enable transition after manual change
    }, 500); // Adjust the time as needed for your transition
  }
}

showSlides();
//ends here

//background_image home page
const backgroundSections = document.querySelectorAll(".background-image");

document.addEventListener("scroll", function () {
  backgroundSections.forEach((section, index) => {
    const distanceFromTop = section.getBoundingClientRect().top;
    const opacity = 1 - Math.min(1, Math.max(0, distanceFromTop / window.innerHeight));
    section.style.opacity = opacity;
  });
});
//ends here

//Mock interview
document.addEventListener('DOMContentLoaded', function () {
  const topicCheckboxes = document.querySelectorAll('.topic-checkbox');
  const submitButton = document.getElementById('apply_for_mock');
  const successModal = document.getElementById('success-modal');
  const successClose = successModal.querySelector('.close');

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    const selectedTopics = Array.from(topicCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);


    // Send selectedTopics and recipientEmail to the backend using AJAX or fetch API
    // For this example, we'll assume a function sendDataToBackend() handles the sending
    //  sendDataToBackend(selectedTopics, email);

    // Show success modal
    if(selectedTopics.length!=0)
    successModal.style.display = 'block';
  });

  // Close the modal when the close button is clicked
  successClose.addEventListener('click', function () {
    successModal.style.display = 'none';
  });

  // Close the modal if the user clicks anywhere outside of it
  window.addEventListener('click', function (event) {
    if (event.target === successModal) {
      successModal.style.display = 'none';
    }
  });
});

//ends here  

// Mock Interview email 
// document.getElementById('apply_for_mock').addEventListener('click', async function() {
//   const checkboxes = document.querySelectorAll('.topic-checkbox'); // Get all checkboxes
//   const selectedTopics = Array.from(checkboxes)
//     .filter(checkbox => checkbox.checked)
//     .map(checkbox => checkbox.value); // Extract selected topics
  
//   // Send selected topics to the server using a POST request
//   try {
//     const response = await fetch('/mock_block', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ topics: selectedTopics })
//     });

//     const data = await response.json();
//     console.log(data.message); // Output the response from the server
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });
// ends here