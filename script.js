
const sRecog = window.SpeechRecognition || window.webkitSpeechRecognition
var statusText = document.getElementById('status')
let text = document.getElementById('text')
var active = false
document.addEventListener('DOMContentLoaded',()=>{
    if(!sRecog){
          statusText.textContent = "error"
             
    }else{
            statusText.textContent = "Active"
            const Recog =new sRecog()
            Recog.continuous = true;
            Recog.interimResults = true;
            Recog.lang = 'en-US';
            Recog.start()
            Recog.onresult = (event)=>{
            const transcript = event.results[event.results.length - 1][0].transcript;
            text.textContent = transcript
            if (transcript.toLowerCase().includes("gajju") || transcript.includes("gaju")) {
                statusText.textContent = "Listening...";
                active = true
              }

              if (transcript.toLowerCase().includes("bye gajju") || transcript.includes("bye gaju")) {
                statusText.textContent = "Active";
                statusText.bgColor = "red"
                active = false
              }  
            }
            Recog.onend = () => {
            Recog.start();
          };
    }

 
})