var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var CONTINUOUS = true;
var inputIndex = 0;

// Keywords
var keywords = '#JSGF V1.0; grammar keywords; public <keyword> = asthma | COPD | medication;'

// API setup
var recognition = new SpeechRecognition();
recognition.lang = 'en-GB';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = CONTINUOUS;

var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(keywords, 1);
recognition.grammars = speechRecognitionList;

// Click to listen. In none-continuous mode it'll stop listening when you finish speaking.
document.addEventListener("DOMContentLoaded", function() {
  startRecognition();
});

// Kick the listening off.
startRecognition = function() {
  recognition.start();

  if(CONTINUOUS)
    console.log('Starting in CONTINOUS mode.');
  else
    console.log('Starting... please issue a command.');
}

// Print the result, including how sure the API is about what it thinks you said.
recognition.onresult = function(event) {
  var command = event.results[inputIndex][0].transcript;
  console.log('Result received: ' + command);
  console.log('With confidence: ' + event.results[inputIndex][0].confidence);
  console.log('---------------');

  // Potentially do something like 'if confidence > threshold' here before proceeding,
  // to account for noisy environments like a kitchen. Be sure before acting on commands!
  handleCommand(command);

  // In continuous mode, increment so we see the right sample!
  if(CONTINUOUS)
    inputIndex++;
}


handleCommand = function(cmd) {
  analyseResponse(cmd);
}

// Stop the recognition, regardless of if you were understood
// (or even spoke, this gets called after a few seconds of silence)
recognition.onspeechend = function() {
  if(!CONTINUOUS) {
    console.log("Stopping...");
    recognition.stop();
  }
}

// Called when the API heard you, but didn't match a phrase.
recognition.onnomatch = function(event) {
  console.log('Error: No match.');
}

// Called when there's an error, for example a permissions issue.
// This is where you'd potentially catch none-supported platforms and handle it.
recognition.onerror = function(event) {
  console.log('Error: ' + event.error);
}
