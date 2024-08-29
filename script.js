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
    Recog.interimResults = false;
    Recog.lang = "en-US";
    Recog.start();
    Recog.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      text.textContent = transcript;
      handleTranscript(transcript);
    };
    Recog.onend = () => {
      if (active) {
        Recog.start();
      } else {
        statusText.textContent = "Active";
      }
    };
  }
});

function handleTranscript(transcript) {
  if (
    transcript.toLowerCase().includes("hey gajju") ||
    transcript.toLowerCase().includes("hey gaju")
  ) {
    active = true;
    console.log(transcript);

    speak("Yes Sir! How may I help you");
    statusText.textContent = "Listening...";
  } else if (
    transcript.toLowerCase().includes("bye gajju") ||
    transcript.toLowerCase().includes("bye gaju") ||
    transcript.toLowerCase().includes("bhai gaju") ||
    transcript.toLowerCase().includes("bhai gajju")
  ) {
    console.log(transcript);
    active = false;
    speak("Have a great day!");
    statusText.textContent = "Active";
  }
}

function speak(text) {
  console.log("Attempting to speak:", text); // Debugging line
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // Set language
  utterance.pitch = 1.2; // Set pitch (0 to 2)
  utterance.rate = 1.2; // Set rate (0.1 to 10)
  utterance.volume = 1; // Set volume (0 to 1)
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[3]
  speechSynthesis.speak(utterance);
}


