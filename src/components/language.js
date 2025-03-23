const Languages = [
  { code: "ar", name: "Arabic" },
  { code: "bg", name: "Bulgarian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek, Modern (1453-)" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish; Castilian" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "hi", name: "Hindi" },
  { code: "hr", name: "Croatian" },
  { code: "id", name: "Indonesian" },
  { code: "ie", name: "Interlingue; Occidental" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ms", name: "Malay" },
  { code: "nl", name: "Dutch; Flemish" },
  { code: "pt", name: "Portuguese" },
  { code: "ro", name: "Romanian; Moldavian; Moldovan" },
  { code: "ru", name: "Russian" },
  { code: "sk", name: "Slovak" },
  { code: "sv", name: "Swedish" },
  { code: "ta", name: "Tamil" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "zh", name: "Chinese" },
  { code: "bn", name: "Bangla"}
];

const getLanguageCode = (language) => {
  const query = language;
  const regex = new RegExp(query, "i");
  const nameMatches = Languages.find((product) => regex.test(product.name));
  return nameMatches.code;
};

export default getLanguageCode;
