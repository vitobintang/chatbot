import React, { useState } from 'react';

const VoiceChat = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      onVoiceInput(speechToText); // Pass the recognized text to the parent component
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  return (
    <button onClick={startListening} disabled={isListening}>
      {isListening ? <img src="/hear.png" alt="" /> : <img src="/mic.png" alt="" />}
    </button>
  );
};

export default VoiceChat;