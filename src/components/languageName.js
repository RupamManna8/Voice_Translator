const Languages = [
  { code: "ar-SA", name: "Arabic" },
  { code: "bg-BG", name: "Bulgarian" },
  { code: "cs-CZ", name: "Czech" },
  { code: "da-DK", name: "Danish" },
  { code: "de-DE", name: "German" },
  { code: "el-GR", name: "Greek, Modern (1453-)" },
  { code: "en-US", name: "English" },
  { code: "es-ES", name: "Spanish; Castilian" },
  { code: "fi-FI", name: "Finnish" },
  { code: "fr-FR", name: "French" },
  { code: "hi-IN", name: "Hindi" },
  { code: "hr-HR", name: "Croatian" },
  { code: "id-ID", name: "Indonesian" },
  { code: "ie-IE", name: "Interlingue; Occidental" },
  { code: "it-IT", name: "Italian" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "ms-MY", name: "Malay" },
  { code: "nl-NL", name: "Dutch; Flemish" },
  { code: "pt-PT", name: "Portuguese" },
  { code: "ro-RO", name: "Romanian; Moldavian; Moldovan" },
  { code: "ru-RU", name: "Russian" },
  { code: "sk-SK", name: "Slovak" },
  { code: "sv-SE", name: "Swedish" },
  { code: "ta-IN", name: "Tamil" },
  { code: "tr-TR", name: "Turkish" },
  { code: "uk-UA", name: "Ukrainian" },
  { code: "zh-CN", name: "Chinese" },
  { code: "bn-IN", name:  "Bangla"}
];


const languageName=()=>{
    const Names = Languages.map((name)=>name.name);
    return Names;
  }


  export default languageName;