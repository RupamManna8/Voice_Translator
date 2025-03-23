##  Speech-to-Text Translator Web App

# Overview

This web app allows users to record their speech, convert it into text, translate it into a selected language, and play back the translated text using text-to-speech technology.

# Features

Speech recognition using Web Speech API

Translation of recognized text to a selected language

Text-to-speech playback of the translated text

Automatic stop on silence detection

User-friendly language selection interface

# Technologies Used

React.js

react-speech-recognition for speech-to-text functionality

translateHTML function for translation

convertTextToSpeech function for text-to-speech conversion

Custom CSS for styling

# Installation

Prerequisites

Make sure you have Node.js and npm installed on your system.

Steps

Clone the repository:

git clone https://github.com/yourusername/speech-translator.git
cd speech-translator

Install dependencies:

npm install

Start the development server:

npm start

Open the app in your browser at http://localhost:3000/.

# Usage

Select the source and target languages.

Click on the Start Recording button and start speaking.

The speech will be recognized and converted into text.

After stopping the recording, the recognized text will be translated.

The translated text will be played back using text-to-speech.

Click Play Again to replay the translated text.

# File Structure

.
├── src
│   ├── components
│   │   ├── Translate.js
│   │   ├── Speech.js
│   │   ├── languageName.js
│   │   ├── language.js
│   ├── styles
│   │   ├── app.css
│   ├── App.js
│   ├── index.js
├── package.json
└── README.md


# Limitations

The Web Speech API might not work on all browsers (recommended: Chrome).

Requires an active internet connection for translation and text-to-speech.

# License

This project is licensed under the MIT License.

# Author
Rupam Manna