import React, { useState, useEffect, useRef, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import translateHTML from "./components/Translate";
import { convertTextToSpeech } from "./components/Speech";
import languageName from "./components/languageName";
import getLanguageCode from "./components/language";
import "./styles/app.css";

export default function App() {
  const { transcript, browserSupportsSpeechRecognition, listening, resetTranscript } = useSpeechRecognition();
  const LanguageName = languageName();

  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [languageFrom, setLanguageFrom] = useState("English");
  const [languageTo, setLanguageTo] = useState("Hindi");
  const [isProcessing, setIsProcessing] = useState(false);
  const silenceTimeout = useRef(null);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimeout.current) {
      clearTimeout(silenceTimeout.current);
    }
  }, []);

  const offRecording = useCallback(() => {
    SpeechRecognition.stopListening();
    clearSilenceTimer();
    setIsProcessing(true);

    if (text.trim() !== "") {
      if (languageFrom && languageTo) {
        translateHTML(languageFrom, languageTo, text)
          .then((translated) => {
            setTranslatedText(translated);
            const code = getLanguageCode(languageTo);
            convertTextToSpeech(translated, code);
          })
          .catch((error) => {
            console.error("Translation failed:", error);
            alert("Translation failed. Please try again.");
          })
          .finally(() => setIsProcessing(false));
      } else {
        alert("Selected languages are not supported.");
        setIsProcessing(false);
      }
    } else {
      alert("No speech detected. Please speak something.");
      setIsProcessing(false);
    }
  }, [text, languageFrom, languageTo, clearSilenceTimer]);

  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    silenceTimeout.current = setTimeout(() => {
      if (listening) {
        offRecording();
      }
    }, 2000);
  }, [listening, offRecording, clearSilenceTimer]);

  const onRecording = useCallback(() => {
    const languageCode = getLanguageCode(languageFrom);
    if (!languageCode) {
      alert("Unsupported language selected for recognition.");
      return;
    }
    SpeechRecognition.startListening({
      continuous: true,
      language: languageCode === "bn" ? "bn-IN" : languageCode,
    });
    resetSilenceTimer();
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
    return (
      <div className="browser-error">
        <h2>Unsupported Browser</h2>
        <p>Your browser does not support Speech Recognition. Please try Chrome or Edge.</p>
      </div>
    );
  }

  const playAgain = () => {
    const code = getLanguageCode(languageTo);
    convertTextToSpeech(translatedText, code);
  };

  const handleLanguageFromChange = (e) => {
    const newLanguage = e.target.value;
    if (text !== "") {
      translateHTML(languageFrom, newLanguage, text)
        .then((res) => {
          resetTranscript();
          setText(res);
        })
        .catch(() => {
          console.log("Unable to translate source text.");
        });
    }
    setLanguageFrom(newLanguage);
  };

  const handleLanguageToChange = (e) => {
    const newLanguage = e.target.value;
    if (translatedText !== "") {
      translateHTML(languageTo, newLanguage, translatedText)
        .then((res) => {
          setTranslatedText(res);
        })
        .catch(() => {
          console.log("Unable to translate translated text.");
        });
    }
    setLanguageTo(newLanguage);
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
    resetTranscript();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Speech Translator</h1>
      <p className="app-subtitle">Speak in one language, hear in another</p>

      <div className="button-container">
        <button
          className={`record-btn start ${listening ? "active" : ""}`}
          onClick={onRecording}
          disabled={listening || isProcessing}
        >
          {listening ? (
            <>
              <span className="pulse-animation"></span>
              Listening...
            </>
          ) : (
            "Start Recording"
          )}
        </button>
        <button
          className="record-btn stop"
          onClick={offRecording}
          disabled={!listening || isProcessing}
        >
          Stop Recording
        </button>
      </div>

      <div className="selection-container">
        <div className="language-selection">
          <label>From:</label>
          <select value={languageFrom} onChange={handleLanguageFromChange} disabled={isProcessing}>
            {LanguageName.map((lan, index) => (
              <option key={index} value={lan}>
                {lan}
              </option>
            ))}
          </select>
        </div>

        <div className="language-selection">
          <label>To:</label>
          <select value={languageTo} onChange={handleLanguageToChange} disabled={isProcessing}>
            {LanguageName.map((lan, index) => (
              <option key={index} value={lan}>
                {lan}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-display">
        <div className="text-header">
          <h4>Recognized Text ({languageFrom})</h4>
          <div className="text-actions">
            <button className="action-btn" onClick={() => navigator.clipboard.writeText(text)}>
              Copy
            </button>
          </div>
        </div>
        <div className="text-content">{text || <span className="placeholder">Your speech will appear here</span>}</div>
      </div>

      <div className="text-display">
        <div className="text-header">
          <h4>Translated Text ({languageTo})</h4>
          <div className="text-actions">
            <button className="action-btn" onClick={() => navigator.clipboard.writeText(translatedText)}>
              Copy
            </button>
            <button className="action-btn play" onClick={playAgain} disabled={!translatedText}>
              Play
            </button>
          </div>
        </div>
        <div className="text-content">
          {translatedText || <span className="placeholder">Translation will appear here</span>}
        </div>
      </div>

      <div className="action-buttons">
        <button className="clear-btn" onClick={handleClear} disabled={isProcessing || (!text && !translatedText)}>
          Clear All
        </button>
      </div>

      <div className={`status-indicator ${isProcessing ? "visible" : ""}`}>
        <div className="spinner"></div>
        Processing...
      </div>
    </div>
  );
}