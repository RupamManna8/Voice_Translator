import getLanguageCode from "../components/language";

async function translateHTML(from, to , text) {
  const url =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/html";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "6b36dc3d04msh554e0a724748c9ap134f52jsn330f7bee3e64",
      "x-rapidapi-host": "google-translate113.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getLanguageCode(from),
      to: getLanguageCode(to),
      html: text,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    return result.trans;
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export default translateHTML;
