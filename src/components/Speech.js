const convertTextToSpeech = async (text, language = "en-US") => {
  if (!text) {
    console.error("No text provided for speech synthesis.");
    return;
  }

  if (!("speechSynthesis" in window)) {
    console.error("Speech synthesis is not supported in this browser.");
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel(); // Cancel ongoing speech

  // Load available voices
  const loadVoices = () =>
    new Promise((resolve) => {
      let voices = synth.getVoices();
      if (voices.length) {
        resolve(voices);
      } else {
        synth.onvoiceschanged = () => resolve(synth.getVoices());
      }
    });

  const voices = await loadVoices();

  // Select the best available voice
  let selectedVoice =
    voices.find(
      (voice) => voice.lang === language && voice.name.includes("Google")
    ) ||
    voices.find((voice) => voice.lang.startsWith(language.split("-")[0])) ||
    voices[0]; // Default to the first available voice

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.lang = language;
  utterance.rate = 0.9; // Adjust for better clarity (0.7 - 1.2 recommended)
  utterance.pitch = 1; // Keep natural tone
  utterance.volume = 1; // Max volume

  utterance.onstart = () =>
    console.log(`Speaking with voice: ${selectedVoice.name}`);
  utterance.onend = () => console.log("Speech completed.");
  utterance.onerror = (event) =>
    console.error("Speech synthesis error:", event);

  synth.speak(utterance);
};

// Ensure iOS Safari allows speech synthesis after user interaction
document.addEventListener(
  "click",
  () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices(); // Preload voices
    }
  },
  { once: true }
);

export { convertTextToSpeech };

// const convertTextToSpeech = async (text) => {
//     try {
//       const response = await fetch(
//         "https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "xi-api-key": "sk_3809316b45a1800fb715561ee5594f28e8b201594a04c148",
//           },
//           body: JSON.stringify({
//             text: text,
//             model_id: "eleven_multilingual_v2",
//             voice_settings: {
//               stability: 0.5,
//               similarity_boost: 0.75,
//             },
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const audioBuffer = await response.arrayBuffer();
//       const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
//       const audioUrl = URL.createObjectURL(audioBlob);

//       return audioUrl;
//     } catch (err) {
//        console.log(err)
//     }
//   };

//   export {convertTextToSpeech};
