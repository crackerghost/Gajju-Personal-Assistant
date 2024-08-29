const sRecog = window.SpeechRecognition || window.webkitSpeechRecognition;

var statusText = document.getElementById("status");
let text = document.getElementById("text");
var active = false;
document.addEventListener("DOMContentLoaded", () => {
  if (!sRecog) {
    statusText.textContent = "error";
  } else {
    statusText.textContent = "Active";
    const Recog = new sRecog();
    Recog.continuous = true;
    Recog.interimResults = true;
    Recog.lang = "en-US";
    Recog.start();
    Recog.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      text.textContent = transcript;
      if (
        transcript.toLowerCase().includes("gajju") ||
        transcript.includes("gaju")
      ) {
        speak("Yes Sir! How may i help you")
        statusText.textContent = "Listening...";
        
        active = true;
      }

      if (
        transcript.toLowerCase().includes("bye gajju") ||
        transcript.includes("bye gaju")
      ) {
        speak("Have a great day!")
        statusText.textContent = "Active";

        active = false;
      }
    };
    Recog.onend = () => {
      Recog.start();
    };
  }
});

function speak(text){
    const utterance = new window.SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'; // Set language
    utterance.pitch = 1; // Set pitch (0 to 2)
    utterance.rate = 1; // Set rate (0.1 to 10)
    utterance.volume = 1; // Set volume (0 to 1)
    speechSynthesis.speak(utterance);
}