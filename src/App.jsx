import React, { useState, useEffect, useRef, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import translateHTML from "./components/Translate";
import { convertTextToSpeech } from "./components/Speech";
import languageName from "./components/languageName";
import getLanguageCode from "./components/language";
import "./styles/app.css"

export default function App() {
  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition();
  const LanguageName = languageName();
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const silenceTimeout = useRef(null);
  const [languageFrom, setLanguageFrom] = useState("English");
  const [languageTo, setLanguageTo] = useState("Hindi");
 

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimeout.current) {
      clearTimeout(silenceTimeout.current);
    }
  }, []);

  const offRecording = useCallback(() => {
    SpeechRecognition.stopListening();
    clearSilenceTimer();
  
    if (text.trim() !== "") {
      if (languageFrom && languageTo) {
        translateHTML(languageFrom, languageTo, text)
          .then((translated) => {
            setTranslatedText(translated);
             const code = getLanguageCode(languageTo);
             convertTextToSpeech(translated,code);
          })
          .catch((error) => {
            console.error("Translation failed:", error);
            alert("Translation failed. Please try again.");
          });
      } else {
        alert("Selected languages are not supported.");
      }
    } else {
      alert("No speech detected. Please speak something.");
    }
  }, [text, languageFrom, languageTo, clearSilenceTimer]);
  

  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    silenceTimeout.current = setTimeout(() => {
      if (listening) {
        offRecording();
        alert("Recording stopped automatically due to silence.");
      }
    }, 2000); // 2 seconds
  }, [listening, offRecording, clearSilenceTimer]);

  const onRecording = useCallback(() => {
    const languageCode = getLanguageCode(languageFrom);
    if (!languageCode) {
      alert("Unsupported language selected for recognition.");
      return;
    }
    SpeechRecognition.startListening({ continuous: true, language: languageCode });
    resetSilenceTimer();
    alert("Recording started. Please speak.");
  }, [resetSilenceTimer, languageFrom]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (transcript) {
        setText(transcript);
        resetSilenceTimer();
      }
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [transcript, resetSilenceTimer]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support Speech Recognition.</div>;
  }

  const playAgain = () =>{
    const code = getLanguageCode(languageTo);
   convertTextToSpeech(translatedText,code);
  }

  return (
    <div className="app-container">
    <div className="button-container">
      <button className="record-btn start" onClick={onRecording}>
        Start Recording
      </button>
      <button className="record-btn stop" onClick={offRecording}>
        Stop Recording
      </button>
    </div>
  
    <div className="selection-container">
      <div className="from-language-selection">
        <label>From:</label>
        <select value={languageFrom} onChange={(e) => setLanguageFrom(e.target.value)}>
          {LanguageName.map((lan, index) => (
            <option key={index} value={lan}>
              {lan}
            </option>
          ))}
        </select>
      </div>
  
      <div className="to-language-selection">
        <label>To:</label>
        <select value={languageTo} onChange={(e) => setLanguageTo(e.target.value)}>
          {LanguageName.map((lan, index) => (
            <option key={index} value={lan}>
              {lan}
            </option>
          ))}
        </select>
      </div>
    </div>
  
    <div className="text-display">
      <h4>Recognized Text:</h4>
      <p className="recognized-text">{text}</p>
    </div>
  
    <div className="text-display">
      <h4>Translated Text:</h4>
      <p className="translated-text">{translatedText}</p>
    </div>

    <button onClick={playAgain}>play again</button>
  </div>
  
  
  );
}


